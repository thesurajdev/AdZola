/**
 * AdZola Server
 * Simple Node.js server for development and production
 * Serves static files and handles API endpoints
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm'
};

/**
 * Get MIME type from file extension
 */
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Serve static files with Range Request support for video streaming
 */
function serveStaticFile(filePath, req, res) {
    // Security: prevent directory traversal
    const normalizedPath = path.normalize(filePath);
    if (normalizedPath.includes('..')) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>403 Forbidden</h1>');
        return;
    }

    // Check if file exists
    fs.stat(normalizedPath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 - File Not Found</h1><p>${filePath}</p>`);
            return;
        }

        // Handle directory requests
        if (stats.isDirectory()) {
            const indexPath = path.join(normalizedPath, 'index.html');
            fs.stat(indexPath, (err) => {
                if (err) {
                    res.writeHead(403, { 'Content-Type': 'text/html' });
                    res.end('<h1>403 Forbidden - No index.html</h1>');
                } else {
                    serveStaticFile(indexPath, req, res);
                }
            });
            return;
        }

        // Get file MIME type
        const mimeType = getMimeType(normalizedPath);
        const fileSize = stats.size;

        // Handle Range requests (for video seeking and streaming)
        const range = req.headers.range;
        
        if (range) {
            // Parse range header (e.g., "bytes=0-1023")
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            // Validate range
            if (start >= fileSize || end >= fileSize) {
                res.writeHead(416, {
                    'Content-Range': `bytes */${fileSize}`
                });
                res.end();
                return;
            }

            const chunksize = (end - start) + 1;

            // Set 206 Partial Content response
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=86400'
            });

            fs.createReadStream(normalizedPath, { start: start, end: end }).pipe(res);
        } else {
            // Serve full file
            res.writeHead(200, {
                'Content-Type': mimeType,
                'Content-Length': fileSize,
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=86400',
                'ETag': `"${stats.mtime.getTime()}"`
            });

            fs.createReadStream(normalizedPath).pipe(res);
        }
    });
}

/**
 * Handle form submission API
 */
function handleFormSubmit(req, res, reqBody) {
    let body = '';

    // Collect request body
    req.on('data', chunk => {
        body += chunk.toString();
        if (body.length > 1e7) {
            res.writeHead(413, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Payload too large' }));
        }
    });

    req.on('end', () => {
        try {
            // Parse form data (URL encoded)
            const params = new URLSearchParams(body);
            const formData = {
                name: params.get('name'),
                email: params.get('email'),
                mobile: params.get('mobile'),
                budget: params.get('budget'),
                services: params.get('services'),
                project_details: params.get('project_details')
            };

            // Validate required fields
            if (!formData.email || !formData.mobile) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Email and mobile are required' }));
                return;
            }

            // Log the submission (in production, send to database or email service)
            console.log('✅ Form submitted:', formData);
            console.log('📧 Email:', formData.email);
            console.log('📱 Mobile:', formData.mobile);
            console.log('💰 Budget:', formData.budget);
            console.log('🎯 Services:', formData.services);

            // Return success response
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ success: true, message: 'Form submitted successfully' }));

        } catch (error) {
            console.error('❌ Form processing error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error processing form' }));
        }
    });
}

/**
 * Handle CORS preflight requests
 */
function handleCORS(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
}

/**
 * Main request handler
 */
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Remove trailing slash for root
    if (pathname === '/') {
        pathname = '/index.html';
    }

    console.log(`${req.method} ${req.url}`);

    // Handle API routes
    if (pathname === '/api/submit-form') {
        if (req.method === 'OPTIONS') {
            handleCORS(req, res);
        } else if (req.method === 'POST') {
            handleFormSubmit(req, res);
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
        return;
    }

    // Handle static files
    const filePath = path.join(__dirname, pathname);
    serveStaticFile(filePath, req, res);
});

// Start server
server.listen(PORT, HOST, () => {
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║     🚀 AdZola Server Started           ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('');
    console.log(`✨ Server running at: http://${HOST}:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔧 API endpoint: http://${HOST}:${PORT}/api/submit-form`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('');
    console.log('🛑 Server shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
    });
});

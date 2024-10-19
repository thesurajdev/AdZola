// /api/submit-form.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, services, budget, projectDetails } = req.body;

        // Prepare services string if multiple services are selected
        const servicesList = Array.isArray(services) ? services.join(', ') : services;

        // Set up Nodemailer transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER, // Use environment variables
                pass: process.env.GMAIL_PASS, // Gmail password or App Password
            },
        });

        // Send an email with form data
        try {
            await transporter.sendMail({
                from: process.env.GMAIL_USER, // Change to your email
                to: process.env.GMAIL_USER, // Change to your email
                subject: `New form submission from ${name}`,
                text: `
                    Name: ${name}
                    Email: ${email}
                    Services: ${servicesList || 'None'}
                    Budget: ${budget || 'Not specified'}
                    Project Details: ${projectDetails || 'No details provided'}
                `,
            });

            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

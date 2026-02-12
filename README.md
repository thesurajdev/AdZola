# 🚀 AdZola - Digital Marketing Agency

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-v14+-green.svg)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)](#)

AdZola is a modern, high-performance digital marketing and advertising agency website built with custom-crafted frontend architecture and Node.js backend. Designed for speed, responsiveness, and seamless user experience across all devices.

---

## ✨ Features

- **🎨 Responsive Design** - Mobile-first approach with optimized breakpoints (mobile, tablet, desktop)
- **⚡ High Performance** - HTTP Range request support for smooth video streaming
- **🎯 Smart Form Handling** - Webhook integration with Make.com + Email notifications
- **🎬 Advanced Animations** - GSAP animations, parallax effects, and scroll-triggered animations
- **📱 Custom Cursor** - Dynamic cursor effects on desktop (disabled on mobile)
- **🔄 Auto-hiding Header** - Smart navigation that hides on scroll down
- **📸 Lazy Loading** - Optimized image loading for faster page loads
- **🌙 Modern UI** - Sleek gradient-based design with smooth transitions

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom animations
- **JavaScript (Vanilla)** - Modular, event-driven architecture
- **Libraries:**
  - GSAP 3 - Advanced animations
  - ScrollMagic 2.0.7 - Scroll-based effects
  - SplitType - Character animation
  - jQuery 3.5.1 - DOM manipulation
  - Cursor Effects - Custom cursor

### Backend
- **Node.js** - Server runtime
- **HTTP Server** - Built-in Node.js HTTP module
- **Nodemailer** - Email delivery

### Infrastructure
- **npm** - Package management
- **Git** - Version control

---

## 📁 Project Structure

```
AdZola/
├── index.html                 # Main homepage
├── thank-you.html            # Thank you/confirmation page
├── package.json              # Project dependencies
├── server.js                 # Node.js server (dev/prod)
│
├── css/
│   ├── adzola.min.css       # Main design stylesheet (115KB)
│   └── global.css           # Global styles & animations (4.5KB)
│
├── js/
│   ├── config.js            # Centralized configuration
│   ├── utils.js             # Utility functions
│   ├── framework.js         # Webflow framework
│   └── modules/
│       ├── form-handler.js          # Form submissions + webhooks
│       ├── header-scroll.js         # Auto-hide header logic
│       ├── scroll-animations.js     # Parallax & scroll triggers
│       ├── button-animations.js     # Button hover effects
│       └── cursor-effects.js        # Custom cursor management
│
├── api/
│   └── submit-form.js       # Form submission API
│
├── Images/
│   ├── AdZola Logo.svg
│   ├── AdZola Typo Logo.svg
│   └── ... [portfolio images, videos]
│
├── font/                     # Custom fonts
│
├── STRUCTURE.md             # Detailed architecture docs
└── DEVELOPER_GUIDE.md       # Development & debugging guide
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14 or higher
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thesurajdev/AdZola.git
   cd AdZola
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📝 Available Scripts

### `npm run dev` or `npm start`
Starts the Node.js server in development mode.
- Server runs on `http://localhost:3000`
- Serves static files with automatic MIME type detection
- Supports HTTP Range requests for video streaming

---

## 🔧 Configuration

### Main Configuration File: `js/config.js`

Key settings you can customize:

```javascript
const CONFIG = {
  API: {
    SUBMIT_FORM: '/api/submit-form',
    WEBHOOK: 'https://hook.us2.make.com/...', // Make.com webhook
    SUCCESS_PAGE: '/thank-you.html'
  },
  BREAKPOINTS: {
    mobile: 479,
    tablet: 767,
    desktop: 991
  },
  ANIMATIONS: {
    parallaxDistance: 30,
    scrollDuration: 5,
    staggerDelay: 0.1
  }
};
```

---

## 📧 Form Submission Flow

1. **User fills form** on contact section
2. **Form data collected** via FormData API
3. **Webhook sent** to Make.com for automation
4. **API request** sent to `/api/submit-form`
5. **Thank you page** displayed on success

**Form Fields:**
- Name
- Email (required)
- Mobile (required)
- Budget
- Services
- Project Details

---

## 🎮 Responsive Breakpoints

| Device | Width | Features |
|--------|-------|----------|
| **Mobile** | < 479px | Touch-optimized, simplified cursor, fast animations |
| **Tablet** | 479 - 990px | Medium animations, header adjustments |
| **Desktop** | > 991px | Full parallax, custom cursor, all effects |

---

## 📊 Performance Features

### HTTP Range Requests ✅
- Enables video seeking and smooth buffering
- Returns HTTP 206 Partial Content for byte-range requests
- Reduces bandwidth usage

### Caching Strategy ✅
- Static assets cached for 24 hours
- ETags for efficient validation
- Accept-Ranges header for video optimization

### Code Splitting ✅
- 5 specialized modules for form, header, scroll, buttons, cursor
- Utilities library for common functions
- Centralized configuration reduces code duplication

---

## 🐛 Debugging & Troubleshooting

See **DEVELOPER_GUIDE.md** for detailed debugging instructions:
- Console error tracking
- Network request inspection
- Animation performance profiling
- Form submission testing

**Quick Debug Tips:**

```javascript
// Check current breakpoint
console.log(Utils.getBreakpoint()); // 'mobile', 'tablet', or 'desktop'

// Test if cursor effects active
console.log(Utils.isDesktop()); // true/false

// Manual copyright update
Utils.updateCopyrightYear();
```

---

## 🚢 Deployment

### Production Build
1. Set `NODE_ENV=production`
2. Minify CSS if needed
3. Optimize images
4. Deploy server.js to hosting platform

### Supported Hosting
- **Node.js Hosting:** Heroku, Vercel, AWS, DigitalOcean
- **Static Hosting:** Netlify, Cloudflare Pages (with serverless functions)

### Environment Variables
```bash
PORT=3000                              # Server port
HOST=localhost                         # Server host
NODE_ENV=production                    # Environment mode
```

---

## 📚 Additional Documentation

- **[STRUCTURE.md](STRUCTURE.md)** - Complete project architecture (250+ lines)
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Development workflow & debugging (350+ lines)

---

## 🎯 Key Features Explained

### Modular JavaScript
- 5 specialized modules loaded on demand
- Event-driven initialization (no load-order dependency)
- Easy to add/remove features

### Custom Cursor (Desktop Only)
- Rainbow gradient effect
- Follows mouse movement
- Automatically disabled on mobile

### Smart Header
- Auto-hides when scrolling down
- Auto-shows when scrolling up
- Smooth 300ms transition with 200px trigger

### Parallax & Scroll Effects
- Background parallax on desktop (30px distance)
- GSAP ScrollTrigger for text reveals
- Character stagger animations (0.1s delay)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Suraj Dev**
- GitHub: [@thesurajdev](https://github.com/thesurajdev)
- Website: [adzola.surajdev.com](https://adzola.surajdev.com)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

For support, email contact@adzola.com or open an issue on GitHub.

---

## 🔗 Quick Links

- [View Live Site](https://adzola.surajdev.com)
- [GitHub Repository](https://github.com/thesurajdev/AdZola)
- [Documentation](./DEVELOPER_GUIDE.md)
- [Project Structure](./STRUCTURE.md)

---

**Built with ❤️ for modern web experiences**
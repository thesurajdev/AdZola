# AdZola - Developer Guide

## Quick Start

### Running the Local Server
```bash
cd /workspaces/AdZola
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Project Architecture

### Modular Structure
The website is organized into logical modules for easy maintenance:

```
index.html
├─ css/
│  ├─ global.css (styles for cursor, animations, overlay)
│  └─ adzola.webflow.86e54dd52.css (design styles from Webflow)
└─ js/
   ├─ config.js (centralized configuration)
   ├─ utils.js (helper functions)
   └─ modules/
      ├─ form-handler.js (✉️ form submission logic)
      ├─ header-scroll.js (📍 header hide/show)
      ├─ scroll-animations.js (🎬 parallax & scroll effects)
      ├─ button-animations.js (🎆 button hover effects)
      └─ cursor-effects.js (🖱️ custom cursor)
```

## Making Changes

### Adding New Styles
**Global styles** (scrollbar, cursor, animations, loading overlay):
- Edit: `css/global.css`
- Changes apply to all pages immediately

**Component-specific styles**:
- Edit: `css/adzola.webflow.86e54dd52.css` (caution: this is auto-generated)

### Adding New Functionality

#### Add to Form Handler
File: `js/modules/form-handler.js`

Example - Add validation:
```javascript
// Add before form submission
if (!validateProjectName(form)) {
    showError('Project name is required');
    return;
}
```

#### Add New Module
Create file: `js/modules/my-feature.js`

```javascript
function initMyFeature() {
    // Your code here
    console.log('Feature initialized');
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', initMyFeature);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMyFeature };
}
```

Then add to HTML:
```html
<script src="js/modules/my-feature.js"></script>
```

### Modifying Configuration
File: `js/config.js`

```javascript
const CONFIG = {
    API: {
        WEBHOOK: 'https://your-new-webhook.com',
        SUCCESS_PAGE: '/new-page.html'
    },
    // ... more config
};
```

Then reference in modules:
```javascript
if (typeof CONFIG !== 'undefined') {
    const webhook = CONFIG.API.WEBHOOK;
}
```

### Using Utility Functions
File: `js/utils.js` - Already loaded globally

```javascript
// Check device type
if (Utils.isMobileOrTablet()) {
    // Mobile-specific code
}

// Get current breakpoint
const breakpoint = Utils.getBreakpoint(); // 'mobile', 'tablet', 'desktop'

// Safe element query
const form = Utils.querySelector('#email-form');

// Get form data
const data = Utils.getFormData(form);

// Debug logging
Utils.log('User submitted form', data);
```

## Debugging

### Enable Debug Mode
Edit `js/config.js`:
```javascript
DEBUG: true // Change to true
```

This will log all utility function calls to console.

### Common Issues

#### Cursor not appearing?
- Check screen width >= 991px
- Not on mobile/tablet device
- Check browser console for errors
- Verify `cursor-effects.js` is loaded

#### Form not submitting?
- Check `form.action` is correct (`/api/submit-form`)
- Verify webhook URL in `config.js`
- Check browser console for fetch errors
- Ensure `form-handler.js` is loaded

#### Animations not working?
- Verify GSAP and plugins are loaded in HTML
- Check `scroll-animations.js` for ScrollMagic library
- Verify SplitType library is loaded
- Check browser console for animation errors

#### Header not hiding on scroll?
- Check `.navbar` and `.header_spacer` elements exist
- Verify `header-scroll.js` is loaded
- Scroll distance should be > 200px to trigger
- May not work if page is too short

### Checking if Modules are Loaded

In browser console:
```javascript
// Check if config loaded
console.log(typeof CONFIG); // Should be 'object'

// Check if utils loaded
console.log(typeof Utils); // Should be 'object'

// Check if handleSubmit function exists
console.log(typeof handleSubmit); // Should be 'function'

// Manually trigger module
initHeaderScroll();
initCursorEffects();
```

## Performance Tips

1. **CSS**: Keep global.css minimal, use Webflow CSS for component styles
2. **JS**: Modules load on demand - order doesn't matter much
3. **Images**: Use `loading="lazy"` for images below fold
4. **Animations**: Test on low-end devices for smooth performance
5. **Webhooks**: Use async calls (already done with `.catch()`)

## Testing Checklist

Before deploying changes:

- [ ] Desktop view works (all animations, cursor)
- [ ] Tablet view responsive (no cursor, smooth scrolling)
- [ ] Mobile view responsive (cursor disabled)
- [ ] Form submits successfully
- [ ] Thank you page loads after submission
- [ ] Webhook receives data (check Make.com)
- [ ] Loading overlay appears during submission
- [ ] Error messages display properly
- [ ] Header shows/hides on scroll
- [ ] Button animations work on hover
- [ ] No JavaScript errors in console
- [ ] All images load correctly
- [ ] Videos play correctly

## Deployment

### Pre-deployment Checklist

1. Test all functionality locally
2. Disable `DEBUG` mode in `js/config.js`
3. Verify all API endpoints are correct
4. Ensure environment variables are set
5. Test form submission end-to-end
6. Check all external CDN links are working

### Environment Variables

If moving to production, set:
- `API.WEBHOOK` - Production webhook URL
- `API.SUBMIT_FORM` - Production API endpoint
- `API.SUCCESS_PAGE` - Production thank you page URL

### API Setup

Backend should expect:
```json
{
  "name": "string",
  "email": "string",
  "mobile": "string (10 digits)",
  "budget": "string",
  "services": "array of strings",
  "project_details": "string (optional)"
}
```

Response should be:
```json
{
  "success": true
}
```

## File Size Reference

- `index.html`: ~65KB
- `thank-you.html`: ~50KB
- `css/global.css`: ~4.5KB
- `js/config.js`: ~3KB
- `js/utils.js`: ~6.4KB
- Total modular JS: ~10KB

Total modular code (new): ~25KB additional
Keeps main HTML files clean and focused.

## Troubleshooting Template

**Problem**: [Describe issue]

1. Check browser console for errors
2. Verify module is loaded: `typeof ModuleFunction`
3. Check if conditions are met (breakpoint, device type, etc.)
4. Test in isolation with `Utils.log()`
5. Clear browser cache and hard reload
6. Test in another browser/device

## Contact & Support

- Issue found? Check console errors first
- Need to understand a module? Read the header comments
- Want to add feature? Follow the "Add New Module" pattern above
- Configuration needed? Update `js/config.js`

## Version History

- v1.0 - Initial modular restructuring
  - Extracted CSS to global.css
  - Split JavaScript into modules
  - Created config.js for centralized settings
  - Added utils.js for common functions
  - Created STRUCTURE.md documentation

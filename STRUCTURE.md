# AdZola - Project Structure Documentation

## Overview
AdZola is a modern advertising agency website with optimized code organization and modular architecture.

## Project Structure

```
AdZola/
├── index.html                  # Main homepage
├── pages/
│   └── thank-you.html          # Thank you page after form submission
├── css/
│   ├── adzola.webflow.86e54dd52.css  # Main design stylesheet (generated)
│   └── global.css              # Global styles, animations, and overlays
├── js/
│   ├── webflow.1e471dafb.js   # Webflow framework script
│   └── modules/
│       ├── form-handler.js     # Form submission logic
│       ├── header-scroll.js    # Header hide/show on scroll
│       ├── scroll-animations.js # Parallax and scroll triggers
│       ├── button-animations.js # Button hover animations
│       └── cursor-effects.js   # Custom cursor effects
├── api/
│   └── submit-form.js          # Backend API handler (Node.js/Express)
├── Images/                     # All image and media assets
├── font/                       # Font files
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Key Features

### Responsive Design
- Desktop, tablet, and mobile optimized
- Smooth animations and transitions
- Adaptive layouts for all screen sizes

### Performance Optimization
- Modular JavaScript files for better load times
- Lazy loading for images and media
- Optimized CSS with animations
- Custom scrollbar styling

### Interactive Elements

#### Cursor Effects (Desktop Only)
- Custom circular cursor that follows mouse
- Rainbow color cursor on interaction
- Auto-disabled on mobile/tablet devices
- Smooth transitions and scaling

#### Scroll Animations
- Parallax effects for sections
- Text reveal animations on scroll
- Header auto-hide/show based on scroll direction
- Smooth GSAP animations

#### Button Animations
- Split text animation on hover
- Character-by-character animation effects
- Smooth transitions

### Form Management
- Multi-field contact form
- Budget selection (INR-based)
- Webhook integration (Make.com)
- Backend API submission
- Loading overlay during submission
- Success/error messaging

## Module Descriptions

### form-handler.js
Handles all form-related functionality:
- Form data collection
- Webhook integration to Make.com
- API submission to backend
- Loading overlay management
- Error handling and user feedback
- Redirect to thank you page on success

```javascript
handleSubmit(event) // Main submission handler
```

### header-scroll.js
Manages header visibility:
- Detects scroll direction
- Shows header when scrolling up
- Hides header when scrolling down
- Smooth transitions with delay
- Responsive spacer adjustments

### scroll-animations.js
Handles animations triggered by scroll:
- Initializes ScrollMagic parallax effects
- GSAP ScrollTrigger text reveals
- Screen-responsive animation triggers
- Staggered character animations

### button-animations.js
Manages button hover effects:
- SplitType text splitting
- GSAP timeline animations
- Character-by-character movement
- Smooth mouseenter/mouseleave handlers

### cursor-effects.js
Custom cursor management:
- Rainbow cursor effect
- Custom circle cursor with jQuery
- Hover state detection
- Mobile device detection
- Smooth position tracking

## CSS Organization

### global.css
Centralizes all global styles:
- Scrollbar customization
- Custom cursor styles
- Loading overlay animations
- Text and line animations
- Scroll animations keyframes
- Button transitions
- Performance optimizations (transform3d)

## Configuration

### API Endpoint
- Form action: `/api/submit-form`
- Webhook: `https://hook.us2.make.com/18f8m4u0t997fcryqtdltsughi7b2h88`

### Form Fields
- **Name**: Required text field
- **Email**: Required email field
- **Mobile**: Required 10-digit number
- **Budget**: Radio button selection (1K-5K, 5K-10K, 10K-50K, 50K+)
- **Project Details**: Optional text field

### External Libraries
- GSAP (animation framework)
- ScrollMagic (scroll effects)
- SplitType (text splitting)
- jQuery (utility functions)
- Cursor Effects (custom cursor)
- WebFont (font loading)

## Responsive Breakpoints

- **Mobile**: < 479px
- **Tablet**: 479px - 990px
- **Desktop**: > 991px

Special cursor/animation features disabled on screens < 991px wide.

## Performance Notes

1. **Lazy Loading**: Images use `loading="lazy"` attribute
2. **GPU Acceleration**: CSS `transform3d` used for smooth animations
3. **Modular Scripts**: Load only required modules per page
4. **CSS Optimization**: Separate global styles for better caching
5. **Event Delegation**: Efficient jQuery event handlers

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Note: Custom cursor effects appear only on desktop browsers with screen width > 991px.

## Development Workflow

1. **Local Server**: Run `python3 -m http.server 8000` and open `http://localhost:8000`
2. **CSS Changes**: Edit `css/global.css` for global styles
3. **JS Changes**: Edit modular files in `js/modules/`
4. **Form Logic**: Modify `js/modules/form-handler.js`
5. **HTML Structure**: Update `index.html` or `pages/thank-you.html`

## Testing Checklist

- [ ] Form submission works
- [ ] Webhook integration functional
- [ ] Loading overlay appears/disappears
- [ ] Desktop: Custom cursor visible and responsive
- [ ] Mobile: Cursor disabled, standard cursor appears
- [ ] Scroll animations trigger correctly
- [ ] Button hover animations work
- [ ] Header hide/show on scroll functions
- [ ] Responsive design at all breakpoints
- [ ] Error messages display properly

## Dependencies

See `package.json` for Node.js dependencies:
- nodemailer (for backend email handling)

Frontend libraries loaded via CDN:
- GSAP
- ScrollMagic
- SplitType
- jQuery
- Cursor Effects
- WebFont

## License

ISC

## Contact

Email: adzola@surajdev.com

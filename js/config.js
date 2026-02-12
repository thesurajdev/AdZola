/**
 * Application Configuration
 * Centralized configuration for API endpoints, webhooks, and settings
 */

const CONFIG = {
    // API Configuration
    API: {
        // Backend form submission endpoint
        SUBMIT_FORM: '/api/submit-form',
        
        // Make.com webhook for automation
        WEBHOOK: 'https://hook.us2.make.com/18f8m4u0t997fcryqtdltsughi7b2h88',
        
        // Success redirect page
        SUCCESS_PAGE: '/pages/thank-you.html'
    },

    // Responsive Breakpoints (pixels)
    BREAKPOINTS: {
        MOBILE: 479,
        TABLET: 767,
        DESKTOP: 991
    },

    // Feature Flags
    FEATURES: {
        // Enable custom cursor effects (desktop only)
        CURSOR_EFFECTS: true,
        
        // Enable parallax animations
        PARALLAX: true,
        
        // Enable scroll animations
        SCROLL_ANIMATIONS: true,
        
        // Enable button animations
        BUTTON_ANIMATIONS: true,
        
        // Webhook integration for form
        WEBHOOK_ENABLED: true
    },

    // Animation Configuration
    ANIMATIONS: {
        // Header scroll delay (ms)
        HEADER_SCROLL_DELAY: 300,
        
        // Scroll distance before triggering header animation (px)
        SCROLL_TRIGGER_DISTANCE: 200,
        
        // Parallax offset (rem units)
        PARALLAX_OFFSET: 6,
        
        // Button animation duration (s)
        BUTTON_ANIMATION_DURATION: 0.5,
        
        // Text stagger delay (s)
        TEXT_STAGGER_DELAY: 0.02
    },

    // Form Configuration
    FORM: {
        // Form ID
        ID: 'email-form',
        
        // Form fields
        FIELDS: {
            NAME: 'name',
            EMAIL: 'email',
            MOBILE: 'mobile',
            BUDGET: 'budget',
            SERVICES: 'services',
            PROJECT_DETAILS: 'project_details'
        },
        
        // Validation
        VALIDATION: {
            EMAIL_REQUIRED: true,
            MOBILE_REQUIRED: true,
            MOBILE_PATTERN: '[0-9]{10}',
            NAME_MAX_LENGTH: 256,
            PROJECT_DETAILS_MAX_LENGTH: 256
        }
    },

    // Loading Overlay Configuration
    LOADING: {
        // Overlay element ID
        OVERLAY_ID: 'loading-overlay',
        
        // Spinner element class
        SPINNER_CLASS: 'loading-spinner',
        
        // Overlay z-index
        Z_INDEX: 9999
    },

    // Desktop-only Features
    DESKTOP_ONLY: {
        MIN_WIDTH: 991,
        FEATURES: ['cursor-effects', 'parallax']
    },

    // Mobile Device Detection
    MOBILE_AGENTS: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,

    // Logging (development)
    DEBUG: false
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

/**
 * Utility Functions
 * Common helper functions used across the application
 */

const Utils = {
    /**
     * Check if device is mobile or tablet
     * @returns {boolean}
     */
    isMobileOrTablet() {
        if (typeof CONFIG !== 'undefined' && CONFIG.MOBILE_AGENTS) {
            return CONFIG.MOBILE_AGENTS.test(navigator.userAgent);
        }
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Check if screen width meets desktop requirements
     * @returns {boolean}
     */
    isDesktop() {
        const minWidth = (typeof CONFIG !== 'undefined' && CONFIG.DESKTOP_ONLY.MIN_WIDTH) || 991;
        return window.innerWidth >= minWidth;
    },

    /**
     * Get current breakpoint
     * @returns {string} 'mobile', 'tablet', or 'desktop'
     */
    getBreakpoint() {
        const width = window.innerWidth;
        if (typeof CONFIG !== 'undefined' && CONFIG.BREAKPOINTS) {
            if (width < CONFIG.BREAKPOINTS.MOBILE) return 'mobile';
            if (width < CONFIG.BREAKPOINTS.DESKTOP) return 'tablet';
        } else {
            if (width < 479) return 'mobile';
            if (width < 991) return 'tablet';
        }
        return 'desktop';
    },

    /**
     * Log debug message (only if DEBUG enabled)
     * @param {string} message
     * @param {any} data
     */
    log(message, data = null) {
        if (typeof CONFIG !== 'undefined' && CONFIG.DEBUG) {
            if (data) {
                console.log(`[AdZola] ${message}:`, data);
            } else {
                console.log(`[AdZola] ${message}`);
            }
        }
    },

    /**
     * Wait for element to be available
     * @param {string} selector
     * @param {number} timeout - milliseconds
     * @returns {Promise<Element>}
     */
    waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            let element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver(() => {
                element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    },

    /**
     * Safe DOM query with error handling
     * @param {string} selector
     * @returns {Element|null}
     */
    querySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            this.log(`Failed to query selector: ${selector}`, error);
            return null;
        }
    },

    /**
     * Safe form data collection
     * @param {HTMLFormElement} form
     * @returns {Object}
     */
    getFormData(form) {
        if (!form || !(form instanceof HTMLFormElement)) {
            return {};
        }

        const data = {};
        new FormData(form).forEach((value, key) => {
            data[key] = value;
        });
        return data;
    },

    /**
     * Collect checked checkboxes by name
     * @param {string} name
     * @returns {Array<string>}
     */
    getCheckedValues(name) {
        const values = [];
        document.querySelectorAll(`input[type="checkbox"][name="${name}"]:checked`).forEach(checkbox => {
            values.push(checkbox.value);
        });
        return values;
    },

    /**
     * Get selected radio button value
     * @param {string} name
     * @returns {string|null}
     */
    getRadioValue(name) {
        const radio = document.querySelector(`input[type="radio"][name="${name}"]:checked`);
        return radio ? radio.value : null;
    },

    /**
     * Show element with optional class
     * @param {HTMLElement} element
     * @param {string} className
     */
    show(element, className = null) {
        if (!element) return;
        element.style.display = '';
        if (className) {
            element.classList.add(className);
        }
    },

    /**
     * Hide element
     * @param {HTMLElement} element
     * @param {string} className
     */
    hide(element, className = null) {
        if (!element) return;
        element.style.display = 'none';
        if (className) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle element visibility
     * @param {HTMLElement} element
     */
    toggle(element) {
        if (!element) return;
        element.style.display = element.style.display === 'none' ? '' : 'none';
    },

    /**
     * Add class to element safely
     * @param {HTMLElement} element
     * @param {string} className
     */
    addClass(element, className) {
        if (element && className) {
            element.classList.add(className);
        }
    },

    /**
     * Remove class from element safely
     * @param {HTMLElement} element
     * @param {string} className
     */
    removeClass(element, className) {
        if (element && className) {
            element.classList.remove(className);
        }
    },

    /**
     * Throttle function execution
     * @param {Function} func
     * @param {number} limit - milliseconds
     * @returns {Function}
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Debounce function execution
     * @param {Function} func
     * @param {number} delay - milliseconds
     * @returns {Function}
     */
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    },

    /**
     * Update copyright year to current year
     * @returns {void}
     */
    updateCopyrightYear() {
        const yearElement = document.getElementById('copyright-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
};

// Update copyright year when utilities load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Utils.updateCopyrightYear();
    });
} else {
    Utils.updateCopyrightYear();
}

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

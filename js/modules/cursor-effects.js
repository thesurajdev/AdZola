/**
 * Cursor Effects Module
 * Handles custom cursor animation and hover effects
 */

function initCursorEffects() {
    // Check if device is mobile or tablet
    function isMobileOrTablet() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Check screen width
    function isScreenWidthLessThan991() {
        return window.innerWidth < 991;
    }

    // Only initialize on desktop devices with sufficient screen width
    if (!isMobileOrTablet() && !isScreenWidthLessThan991()) {
        try {
            // Initialize rainbow cursor effect
            const cursor = new cursoreffects.rainbowCursor({
                colors: ["#ff9700"],
                length: 14,
                size: 18,
            });

            // Add custom circular cursor using jQuery
            if (typeof $ !== 'undefined') {
                $(document).ready(function() {
                    const circleCursor = $("<div class='circle-cursor'></div>").appendTo("body");

                    $(document).on("mousemove", function(e) {
                        circleCursor.css({
                            left: e.clientX + "px",
                            top: e.clientY + "px"
                        });
                    });

                    circleCursor.addClass("visible");

                    // Hover effect for work cards
                    $("a.wrk-card").hover(function() {
                        circleCursor.addClass("hovered");
                    }, function() {
                        circleCursor.removeClass("hovered");
                    });

                    // Hover effect for other links
                    $("a:not(.wrk-card)").hover(function() {
                        circleCursor.addClass("other-hovered");
                    }, function() {
                        circleCursor.removeClass("other-hovered");
                    });
                });
            }
        } catch (error) {
            console.warn('Cursor effects initialization failed:', error);
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initCursorEffects);

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initCursorEffects };
}

/**
 * Header Scroll Module
 * Handles header hide/show based on scroll direction
 */

function initHeaderScroll() {
    document.addEventListener("DOMContentLoaded", function() {
        let prevScrollPos = window.pageYOffset;
        let scrolledDistance = 0;
        const header = document.querySelector(".navbar");
        const headerSpacer = document.querySelector(".header_spacer");
        
        if (!header || !headerSpacer) return;

        const originalSpacerHeight = getComputedStyle(headerSpacer).height;

        window.addEventListener("scroll", function() {
            const currentScrollPos = window.pageYOffset;
            const windowWidth = window.innerWidth;

            scrolledDistance += Math.abs(currentScrollPos - prevScrollPos);

            if (scrolledDistance > 200) {
                if (prevScrollPos > currentScrollPos) {
                    // Scrolling up - show header
                    setTimeout(function() {
                        header.style.transform = "translateY(0)";
                        headerSpacer.style.height = windowWidth < 767 ? "1rem" : "1.25rem";
                    }, 300);
                } else {
                    // Scrolling down - hide header
                    setTimeout(function() {
                        header.style.transform = "translateY(-100%)";
                        headerSpacer.style.height = originalSpacerHeight;
                    }, 300);
                }

                // Reset scroll distance after delay
                scrolledDistance = 0;
            }

            prevScrollPos = currentScrollPos;
        });
    });
}

// Initialize on page load
initHeaderScroll();

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeaderScroll };
}

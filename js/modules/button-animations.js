/**
 * Button Animation Module
 * Handles animated text effects on buttons
 */

function initButtonAnimations() {
    const buttons = document.querySelectorAll('[hoverstagger="link"]');

    buttons.forEach((button) => {
        const textElements = button.querySelectorAll('[text-split]');
        const tlHover = gsap.timeline({
            paused: true
        });

        textElements.forEach((textElement, index) => {
            let splitText = new SplitType(textElement, {
                types: ["words", "chars"]
            });
            let chars = splitText.chars;

            if (index === 0) {
                tlHover.to(chars, {
                    duration: 0.5,
                    y: "-100%",
                    ease: "power4.out",
                    stagger: 0.02
                });
            } else {
                tlHover.from(chars, {
                    duration: 0.5,
                    y: "100%",
                    ease: "power4.out",
                    stagger: 0.02
                }, 0.1);
            }
        });

        button.addEventListener("mouseenter", () => {
            tlHover.play();
        });

        button.addEventListener("mouseleave", () => {
            tlHover.reverse();
        });
    });
}

// Initialize when needed
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined' && typeof SplitType !== 'undefined') {
        initButtonAnimations();
    }
});

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initButtonAnimations };
}

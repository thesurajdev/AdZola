/**
 * Scroll Animations Module
 * Handles parallax effects and scroll-triggered animations
 */

function initScrollAnimations() {
    // Check screen width
    function isScreenWidthGreaterThan478() {
        return window.innerWidth > 478;
    }

    // Register GSAP ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize text reveal animations
        const splitTypes = document.querySelectorAll('.reveal-type');
        splitTypes.forEach((char, i) => {
            const text = new SplitType(char, {
                types: ['chars', 'words']
            });
            gsap.from(text.chars, {
                scrollTrigger: {
                    trigger: char,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                    markers: false
                },
                opacity: 0.2,
                stagger: 0.1,
            });
        });
    }

    // Initialize parallax only on larger screens
    if (isScreenWidthGreaterThan478() && typeof ScrollMagic !== 'undefined') {
        try {
            const controller = new ScrollMagic.Controller();
            const sections = document.querySelectorAll('.paralax');
            const yOffset = 6;

            sections.forEach(function(section, index) {
                const yOffSetValue = yOffset * (index + 1);

                if (index < sections.length - 1) {
                    const nextSection = sections[index + 1];
                    new ScrollMagic.Scene({
                        triggerElement: section,
                        triggerHook: 1,
                        duration: '100%'
                    }).setTween(TweenMax.to([section, nextSection], 1, {
                        y: '-' + yOffSetValue + 'rem',
                        ease: Power0.easeNone
                    })).addTo(controller);
                } else {
                    new ScrollMagic.Scene({
                        triggerElement: section,
                        triggerHook: 1,
                        duration: '100%'
                    }).setTween(TweenMax.to(section, 1, {
                        y: '-' + yOffSetValue + 'rem',
                        ease: Power0.easeNone
                    })).addTo(controller);
                }
            });
        } catch (error) {
            console.warn('Parallax initialization failed:', error);
        }
    }
}

// Initialize on window load
window.addEventListener('load', initScrollAnimations);

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initScrollAnimations };
}

document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.querySelector('.animate-marquee-mobile');

    if (marquee) {
        let clone = marquee.cloneNode(true);
        marquee.parentElement.appendChild(clone);

        const animateMarquee = () => {
            let offset = 0;
            let speed = 1; // Adjust speed as needed

            const updateResetPoint = () => {
                // Dynamically calculate based on actual marquee width
                const marqueeWidth = marquee.offsetWidth;
                // Reset point should be just past the full width of one marquee
                return -marqueeWidth;
            };

            let resetPoint = updateResetPoint();

            const step = () => {
                offset -= speed;
                marquee.style.transform = `translateX(${offset}px)`;
                clone.style.transform = `translateX(${offset + marquee.offsetWidth}px)`;

                // Use dynamically calculated reset point
                if (offset <= resetPoint) {
                    offset = 0;
                    // Recalculate in case window or content size changed
                    resetPoint = updateResetPoint();
                }

                requestAnimationFrame(step);
            };

            step();

            // Recalculate on window resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    resetPoint = updateResetPoint();
                }, 250);
            });
        };

        animateMarquee();
    }
});

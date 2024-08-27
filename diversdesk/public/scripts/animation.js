document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.querySelector('.animate-marquee-mobile');

    if (marquee) {
        let clone = marquee.cloneNode(true);
        marquee.parentElement.appendChild(clone);

        const animateMarquee = () => {
            let offset = 0;
            let speed = 1; // Adjust speed as needed

            const updateResetPoint = () => {
                const viewportWidth = window.innerWidth;
                const marqueeWidth = marquee.offsetWidth;

                if (viewportWidth <= 767) {
                    // Mobile: Adjust reset point for smoother scrolling
                    return -marqueeWidth - 367; 
                } else {
                    // Desktop: Different reset point to avoid overlap
                    return -marqueeWidth - 138;
                }
            };

            let resetPoint = updateResetPoint();

            const step = () => {
                offset -= speed;
                marquee.style.transform = `translateX(${offset}px)`;
                clone.style.transform = `translateX(${offset + marquee.offsetWidth}px)`;

                if (offset <= resetPoint) {
                    offset = 0;
                }

                requestAnimationFrame(step);
            };

            step();

            window.addEventListener('resize', () => {
                resetPoint = updateResetPoint();
            });
        };

        animateMarquee();
    }
});

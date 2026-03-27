document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.querySelector("[data-marquee-track]");
    if (!marquee || !marquee.parentElement || marquee.dataset.marqueeInit === "true") {
        return;
    }

    marquee.dataset.marqueeInit = "true";

    const clone = marquee.cloneNode(true);
    clone.removeAttribute("data-marquee-track");
    clone.setAttribute("aria-hidden", "true");
    marquee.parentElement.appendChild(clone);

    let offset = 0;
    let speed = 0.8;
    let marqueeWidth = 0;

    const updateWidth = () => {
        marqueeWidth = marquee.getBoundingClientRect().width;
        clone.style.transform = `translate3d(${offset + marqueeWidth}px, 0, 0)`;
    };

    const applyTransforms = () => {
        marquee.style.transform = `translate3d(${offset}px, 0, 0)`;
        clone.style.transform = `translate3d(${offset + marqueeWidth}px, 0, 0)`;
    };

    const step = () => {
        if (marqueeWidth > 0) {
            offset -= speed;

            // Continuous wrap (no hard reset) keeps motion seamless.
            if (offset <= -marqueeWidth) {
                offset += marqueeWidth;
            }

            applyTransforms();
        }

        requestAnimationFrame(step);
    };

    // Recalculate when image dimensions settle to avoid first-loop jumps.
    const images = marquee.querySelectorAll("img");
    images.forEach((img) => {
        if (!img.complete) {
            img.addEventListener("load", updateWidth, { once: true });
            img.addEventListener("error", updateWidth, { once: true });
        }
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateWidth, 150);
    });

    updateWidth();
    step();
});

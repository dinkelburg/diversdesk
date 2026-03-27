document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.querySelector("[data-marquee-track]");
    if (!marquee || !marquee.parentElement || marquee.dataset.marqueeInit === "true") {
        return;
    }

    marquee.dataset.marqueeInit = "true";

    const clone = marquee.cloneNode(true);
    clone.removeAttribute("data-marquee-track");
    clone.setAttribute("aria-hidden", "true");
    clone.style.pointerEvents = "none";
    marquee.parentElement.appendChild(clone);

    let offset = 0;
    let lastTs = 0;
    let speed = window.innerWidth < 768 ? 42 : 54; // px/sec
    let marqueeWidth = 0;

    const updateWidth = () => {
        marqueeWidth = marquee.scrollWidth;
        if (marqueeWidth > 0) {
            // Keep offset in-range after responsive/layout changes.
            offset = ((offset % marqueeWidth) + marqueeWidth) % marqueeWidth;
            applyTransforms();
        }
    };

    const applyTransforms = () => {
        const x = -offset;
        marquee.style.transform = `translate3d(${x}px, 0, 0)`;
        clone.style.transform = `translate3d(${x + marqueeWidth}px, 0, 0)`;
    };

    const updateSpeed = () => {
        speed = window.innerWidth < 768 ? 42 : 54;
    };

    const step = (ts) => {
        if (!lastTs) {
            lastTs = ts;
        }

        const dt = Math.min((ts - lastTs) / 1000, 0.05);
        lastTs = ts;

        if (marqueeWidth > 0) {
            offset = (offset + speed * dt) % marqueeWidth;
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
        resizeTimeout = setTimeout(() => {
            updateSpeed();
            updateWidth();
        }, 150);
    });

    const observer = new ResizeObserver(() => {
        updateWidth();
    });
    observer.observe(marquee);

    updateSpeed();
    updateWidth();
    requestAnimationFrame(step);
});

const landing = document.querySelector(".landing");
const opening = document.getElementById("opening");
const gallery = document.getElementById("gallery");

document.getElementById("book").addEventListener("click", () => {
    landing.style.display = "none";
    opening.classList.add("active");
});

document.getElementById("startBtn").addEventListener("click", () => {
    opening.classList.remove("active");
    gallery.classList.add("active");

    window.scrollTo({
        top: gallery.offsetTop,
        behavior: "smooth"
    });
});

// 배경 파티클
const particles = document.getElementById("particles");

for (let i = 0; i < 40; i++) {

    const p = document.createElement("div");

    p.style.position = "absolute";
    p.style.width = Math.random() * 6 + 3 + "px";
    p.style.height = p.style.width;
    p.style.borderRadius = "50%";
    p.style.background = "rgba(255,255,255,0.7)";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";

    p.animate([
        { transform: "translateY(0px)", opacity: 0.2 },
        { transform: "translateY(-60px)", opacity: 1 },
        { transform: "translateY(-120px)", opacity: 0.2 }
    ], {
        duration: 4000 + Math.random() * 3000,
        iterations: Infinity
    });

    particles.appendChild(p);
}

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const landing = document.getElementById("landing");
    const book = document.getElementById("book");
    const opening = document.getElementById("opening");
    const startBtn = document.getElementById("startBtn");
    const gallery = document.getElementById("gallery");

    const letterEnvelope = document.getElementById("letterEnvelope");
    const letterOpenButton = document.getElementById("letterOpenButton");

    const bgm = document.getElementById("bgm");
    const musicBtn = document.getElementById("musicBtn");

    const particles = document.getElementById("particles");

    /* 책 클릭 */

    if (book && landing && opening) {
        book.addEventListener("click", () => {
            landing.classList.add("hidden");
            opening.classList.add("show");
        });
    }

    /* Begin 클릭 */

    if (startBtn && opening && gallery) {
        startBtn.addEventListener("click", () => {
            opening.classList.remove("show");
            opening.classList.add("finished");

            setTimeout(() => {
                gallery.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 300);
        });
    }

    /* 편지 열기 */

    if (letterEnvelope && letterOpenButton) {
        letterOpenButton.addEventListener("click", () => {
            const isOpen = letterEnvelope.classList.toggle("open");

            letterOpenButton.textContent = isOpen
                ? "편지 닫기"
                : "편지 열기";
        });
    }

    /* 음악 */

    if (bgm && musicBtn) {
        musicBtn.addEventListener("click", async () => {
            if (bgm.paused) {
                try {
                    await bgm.play();

                    musicBtn.textContent = "♪ Music ON";
                    musicBtn.classList.add("playing");
                } catch (error) {
                    console.error("음악 재생 실패:", error);
                    alert("bgm.mp3 파일이 제대로 업로드됐는지 확인해 주세요.");
                }
            } else {
                bgm.pause();

                musicBtn.textContent = "♪ Music OFF";
                musicBtn.classList.remove("playing");
            }
        });

        bgm.addEventListener("ended", () => {
            musicBtn.textContent = "♪ Music OFF";
            musicBtn.classList.remove("playing");
        });
    }

    /* 스크롤 등장 효과 */

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealItems.forEach((item) => {
            observer.observe(item);
        });
    } else {
        revealItems.forEach((item) => {
            item.classList.add("visible");
        });
    }

    /* 꽃잎 효과 */

    function createPetal() {
        if (!particles) {
            return;
        }

        const petal = document.createElement("span");
        petal.className = "petal";

        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${6 + Math.random() * 5}s`;
        petal.style.animationDelay = `${Math.random() * 2}s`;
        petal.style.opacity = `${0.35 + Math.random() * 0.5}`;
        petal.style.transform = `scale(${0.7 + Math.random() * 0.8})`;

        particles.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 13000);
    }

    setInterval(createPetal, 700);
});

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
        let isOpening = false;

        book.addEventListener("click", () => {
            if (isOpening) return;

            isOpening = true;
            book.classList.add("opening-book");
            landing.classList.add("book-transition");

            setTimeout(() => {
                landing.classList.add("hidden");
                opening.classList.add("show");
            }, 1200);
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

    /* Firebase 실시간 방명록 */

    const guestbookForm = document.getElementById("guestbookForm");
    const guestName = document.getElementById("guestName");
    const guestMessage = document.getElementById("guestMessage");
    const guestbookList = document.getElementById("guestbookList");
    const messageCount = document.getElementById("messageCount");
    const guestbookSubmit = guestbookForm?.querySelector('button[type="submit"]');

    function showGuestbookStatus(text, className = "guestbook-empty") {
        if (!guestbookList) return;
        guestbookList.textContent = "";
        const status = document.createElement("p");
        status.className = className;
        status.textContent = text;
        guestbookList.appendChild(status);
    }

    function formatGuestbookDate(timestamp) {
        const date = timestamp?.toDate ? timestamp.toDate() : new Date();
        return new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);
    }

    function renderFirebaseEntries(snapshot) {
        if (!guestbookList) return;
        guestbookList.textContent = "";

        if (snapshot.empty) {
            showGuestbookStatus("첫 번째 축하 메시지를 남겨주세요 ♡");
            return;
        }

        snapshot.forEach((documentSnapshot) => {
            const entry = documentSnapshot.data();
            const article = document.createElement("article");
            article.className = "guestbook-entry";

            const header = document.createElement("div");
            header.className = "guestbook-entry-header";

            const name = document.createElement("strong");
            name.textContent = String(entry.name || "익명").slice(0, 20);

            const time = document.createElement("time");
            time.textContent = formatGuestbookDate(entry.createdAt);

            const message = document.createElement("p");
            message.textContent = String(entry.message || "").slice(0, 180);

            header.append(name, time);
            article.append(header, message);
            guestbookList.appendChild(article);
        });
    }

    guestMessage?.addEventListener("input", () => {
        if (messageCount) {
            messageCount.textContent = `${guestMessage.value.length} / 180`;
        }
    });

    const configReady = window.firebaseConfig &&
        window.firebaseConfig.apiKey &&
        !String(window.firebaseConfig.apiKey).includes("여기에");

    if (!configReady || !window.firebase) {
        showGuestbookStatus("방명록 연결 설정이 필요합니다. firebase-config.js를 확인해 주세요.");
        if (guestbookSubmit) guestbookSubmit.disabled = true;
    } else {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(window.firebaseConfig);
            }

            const database = firebase.firestore();
            const guestbookCollection = database.collection("guestbook");

            guestbookCollection
                .orderBy("createdAt", "desc")
                .limit(50)
                .onSnapshot(renderFirebaseEntries, (error) => {
                    console.error("방명록 불러오기 실패:", error);
                    showGuestbookStatus("방명록을 불러오지 못했어요. Firestore 규칙을 확인해 주세요.");
                });

            guestbookForm?.addEventListener("submit", async (event) => {
                event.preventDefault();

                const name = guestName?.value.trim();
                const message = guestMessage?.value.trim();
                if (!name || !message) return;

                if (guestbookSubmit) {
                    guestbookSubmit.disabled = true;
                    guestbookSubmit.textContent = "남기는 중…";
                }

                try {
                    await guestbookCollection.add({
                        name: name.slice(0, 20),
                        message: message.slice(0, 180),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    guestbookForm.reset();
                    if (messageCount) messageCount.textContent = "0 / 180";
                } catch (error) {
                    console.error("방명록 저장 실패:", error);
                    alert("메시지를 저장하지 못했어요. Firebase 설정과 보안 규칙을 확인해 주세요.");
                } finally {
                    if (guestbookSubmit) {
                        guestbookSubmit.disabled = false;
                        guestbookSubmit.textContent = "마음 남기기";
                    }
                }
            });
        } catch (error) {
            console.error("Firebase 초기화 실패:", error);
            showGuestbookStatus("Firebase 연결에 실패했어요. firebase-config.js 내용을 확인해 주세요.");
            if (guestbookSubmit) guestbookSubmit.disabled = true;
        }
    }

    /* 영화 같은 엔딩 + 폭죽 */

    const ending = document.getElementById("ending");
    const fireworksCanvas = document.getElementById("fireworksCanvas");
    const replayEnding = document.getElementById("replayEnding");

    let fireworksStarted = false;
    let fireworksFrame = null;
    let particlesFx = [];
    let fireworkTimer = null;

    function resizeFireworksCanvas() {
        if (!fireworksCanvas) return;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const rect = fireworksCanvas.getBoundingClientRect();

        fireworksCanvas.width = Math.max(1, Math.round(rect.width * ratio));
        fireworksCanvas.height = Math.max(1, Math.round(rect.height * ratio));

        const context = fireworksCanvas.getContext("2d");
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function launchFirework() {
        if (!fireworksCanvas) return;

        const rect = fireworksCanvas.getBoundingClientRect();
        const centerX = rect.width * (0.18 + Math.random() * 0.64);
        const centerY = rect.height * (0.16 + Math.random() * 0.45);
        const sparkCount = window.innerWidth < 700 ? 34 : 52;

        for (let i = 0; i < sparkCount; i += 1) {
            const angle = (Math.PI * 2 * i) / sparkCount + Math.random() * 0.18;
            const speed = 1.4 + Math.random() * 3.2;

            particlesFx.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.011 + Math.random() * 0.014,
                size: 1 + Math.random() * 2.1,
                hue: [335, 348, 28, 45, 315][Math.floor(Math.random() * 5)]
            });
        }
    }

    function animateFireworks() {
        if (!fireworksCanvas) return;

        const context = fireworksCanvas.getContext("2d");
        const rect = fireworksCanvas.getBoundingClientRect();

        context.clearRect(0, 0, rect.width, rect.height);
        context.globalCompositeOperation = "lighter";

        particlesFx = particlesFx.filter((spark) => {
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.vx *= 0.988;
            spark.vy = spark.vy * 0.988 + 0.022;
            spark.life -= spark.decay;

            if (spark.life <= 0) return false;

            context.beginPath();
            context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
            context.fillStyle = `hsla(${spark.hue}, 88%, 76%, ${spark.life})`;
            context.fill();
            return true;
        });

        context.globalCompositeOperation = "source-over";
        fireworksFrame = requestAnimationFrame(animateFireworks);
    }

    function startEndingEffect(force = false) {
        if (!ending || !fireworksCanvas) return;
        if (fireworksStarted && !force) return;

        fireworksStarted = true;
        ending.classList.remove("cinematic");
        void ending.offsetWidth;
        ending.classList.add("cinematic");

        particlesFx = [];
        resizeFireworksCanvas();

        if (!fireworksFrame) animateFireworks();

        clearInterval(fireworkTimer);
        launchFirework();
        setTimeout(launchFirework, 450);
        setTimeout(launchFirework, 950);
        fireworkTimer = setInterval(launchFirework, 1250);

        setTimeout(() => clearInterval(fireworkTimer), 8500);
    }

    if (ending) {
        const endingObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) startEndingEffect();
            });
        }, { threshold: 0.42 });

        endingObserver.observe(ending);
    }

    replayEnding?.addEventListener("click", () => startEndingEffect(true));
    window.addEventListener("resize", resizeFireworksCanvas);

});

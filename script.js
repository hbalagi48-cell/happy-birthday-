// ======================
// HBD Project
// Chapter 1
// ======================

// 책 요소
const book = document.getElementById("book");
const transition = document.getElementById("transition");
const particles = document.getElementById("particles");

// ----------------------
// 먼지 입자 생성
// ----------------------

function createParticle(){

    const dot = document.createElement("span");

    dot.className = "particle";

    const size = Math.random()*8+3;

    dot.style.width=size+"px";
    dot.style.height=size+"px";

    dot.style.left=Math.random()*100+"vw";
    dot.style.top="110vh";

    const colors=[
        "#f5c6d6",
        "#d7efe5",
        "#ffffff"
    ];

    dot.style.background=
        colors[Math.floor(Math.random()*colors.length)];

    dot.style.animationDuration=
        (Math.random()*8+8)+"s";

    particles.appendChild(dot);

    setTimeout(()=>{
        dot.remove();
    },17000);

}

setInterval(createParticle,300);

// ----------------------
// 책 클릭
// ----------------------

book.addEventListener("click",()=>{

    book.style.transform="scale(1.18)";
    book.style.transition="0.8s";

    transition.style.opacity="1";
    transition.style.transition="1.2s";

    setTimeout(()=>{

        alert("🎂 다음 챕터(Happy Birthday)가 이어질 예정입니다.");

    },1100);

});

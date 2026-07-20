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

const opening=document.getElementById("opening");
const enter=document.getElementById("enter");

book.addEventListener("click",()=>{

book.style.transform="scale(1.15)";
book.style.opacity="0";

transition.style.opacity="1";

setTimeout(()=>{

transition.style.opacity="0";

opening.classList.add("show");

},1000);

});

enter.addEventListener("click",()=>{

opening.innerHTML=`

<div class="opening-content">

<h2>Gallery</h2>

<p class="quote">

사진이 들어갈 공간입니다.

</p>

</div>

`;

});
// Gallery Fade In

const photos=document.querySelectorAll(".photo");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{

opacity:0,

transform:"translateY(50px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:900,

fill:"forwards"

});

}

});

});

photos.forEach(photo=>{

photo.style.opacity="0";

observer.observe(photo);

});

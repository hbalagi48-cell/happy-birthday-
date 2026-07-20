const landing = document.querySelector(".landing");
const opening = document.getElementById("opening");
const gallery = document.getElementById("gallery");

const book = document.getElementById("book");
const startBtn = document.getElementById("startBtn");

book.addEventListener("click", () => {
    landing.style.display = "none";
    opening.classList.add("active");
});

const works = document.getElementById("works");

startBtn.addEventListener("click", () => {
    opening.classList.remove("active");

    gallery.style.display = "block";
    works.style.display = "block";

    window.scrollTo({
        top: gallery.offsetTop,
        behavior: "smooth"
    });
});

const particles = document.getElementById("particles");

for(let i=0;i<40;i++){

    const p=document.createElement("div");

    p.style.position="absolute";
    p.style.width=Math.random()*6+3+"px";
    p.style.height=p.style.width;
    p.style.left=Math.random()*100+"%";
    p.style.top=Math.random()*100+"%";
    p.style.background="rgba(255,255,255,.8)";
    p.style.borderRadius="50%";

    p.animate(
    [
        {transform:"translateY(0px)",opacity:.2},
        {transform:"translateY(-100px)",opacity:1},
        {transform:"translateY(-200px)",opacity:.2}
    ],
    {
        duration:4000+Math.random()*3000,
        iterations:Infinity
    });

    particles.appendChild(p);

}

const letterEnvelope = document.getElementById("letterEnvelope");
const letterOpenButton = document.getElementById("letterOpenButton");

letterOpenButton.addEventListener("click", () => {
    letterEnvelope.classList.toggle("open");

    if(letterEnvelope.classList.contains("open")){
        letterOpenButton.textContent = "편지 닫기";
    }else{
        letterOpenButton.textContent = "편지 열기";
    }
});

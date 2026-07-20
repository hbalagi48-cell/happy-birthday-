const landing = document.querySelector(".landing");
const opening = document.getElementById("opening");
const gallery = document.getElementById("gallery");
const book = document.getElementById("book");
const startBtn = document.getElementById("startBtn");

book.addEventListener("click", () => {
    landing.style.display = "none";
    opening.style.display = "flex";
});

startBtn.addEventListener("click", () => {
    opening.style.display = "none";
    gallery.style.display = "block";
    window.scrollTo(0, 0);
});

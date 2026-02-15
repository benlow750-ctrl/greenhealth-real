// script.js — site-wide interactions

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Home page banner slider (if present)
  // =========================
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const left = document.querySelector(".slider-arrow.left");
  const right = document.querySelector(".slider-arrow.right");

  if (slides.length) {
    let index = 0;
    let timer = null;

    function setActive(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
      dots.forEach((d, n) => d.classList.toggle("active", n === index));
    }

    function next() {
      setActive(index + 1);
    }

    function prev() {
      setActive(index - 1);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(next, 3000);
    }

    function stopAuto() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    if (left)
      left.addEventListener("click", () => {
        prev();
        startAuto();
      });
    if (right)
      right.addEventListener("click", () => {
        next();
        startAuto();
      });

    dots.forEach((d, n) =>
      d.addEventListener("click", () => {
        setActive(n);
        startAuto();
      })
    );

    const slider = document.querySelector(".slider");
    if (slider) {
      slider.addEventListener("mouseenter", stopAuto);
      slider.addEventListener("mouseleave", startAuto);
    }

    setActive(0);
    startAuto();
  }

  // =========================
  // Demo login button (if present)
  // =========================
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email")?.value?.trim();
      const pass = document.getElementById("password")?.value?.trim();
      if (!email || !pass) {
        alert("Please enter email and password.");
        return;
      }
      alert(`Welcome, ${email}! (demo login)`);
    });
  }

  // =========================
  // Smooth-scroll to timeline sections (if present)
  // =========================
  document.querySelectorAll('a[href^="#year-"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const el = id ? document.querySelector(id) : null;
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // =========================
  // Unique accordion (if present)
  // =========================
  const items = document.querySelectorAll(".unique-acc .u-item");
  if (items.length) {
    items.forEach((item) => {
      const btn = item.querySelector(".u-head");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // close all
        items.forEach((i) => {
          i.classList.remove("is-open");
          const b = i.querySelector(".u-head");
          if (b) b.setAttribute("aria-expanded", "false");
        });

        // open current if it was closed
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }
});
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index){
  slides.forEach((slide,i)=>{
    slide.classList.remove("is-active");
    if(i === index){
      slide.classList.add("is-active");
    }
  });
}

function nextSlide(){
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide(){
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const images = document.querySelectorAll(".expandable");
const closeBtn = document.querySelector(".img-close");

images.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".img-close");

  if (!modal || !modalImg || !closeBtn) return;

  const images = document.querySelectorAll("img.expandable");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "grid";
      modalImg.src = img.src;
      modalImg.alt = img.alt || "Expanded image";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });
});

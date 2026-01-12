const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");
const links = document.querySelectorAll(".nav-menu a");
const glow = document.querySelector(".cursor-glow");

/* ================= GSAP LOAD ================= */
gsap.from(".navbar", {
  y: -60,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

/* ================= HAMBURGER ================= */
hamburger.addEventListener("click", () => {
  const open = menu.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", open);

  if (open) {
    gsap.fromTo(
      links,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "elastic.out(1,0.6)" }
    );
  }
});

/* CLOSE ON LINK CLICK */
links.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

/* CLOSE ON OUTSIDE CLICK */
document.addEventListener("click", e => {
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

/* ================= CURSOR GLOW ================= */
;

const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
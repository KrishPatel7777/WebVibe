// ================= GSAP SCROLLTRIGGER ANIMATIONS =================
gsap.registerPlugin(ScrollTrigger);

// Navbar animation on load
gsap.from(".navbar", {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Hero section animation
gsap.from(".services-hero h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".services-hero .subtitle", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

gsap.from(".services-hero .scroll-indicator", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.6,
    ease: "power3.out"
});

// Service split sections animation
gsap.utils.toArray(".service-split").forEach((section, i) => {
    const content = section.querySelector(".service-content");
    const visual = section.querySelector(".service-visual");

    gsap.from(content, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: section.classList.contains("reverse") ? 50 : -50,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(visual, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: section.classList.contains("reverse") ? -50 : 50,
        duration: 1,
        ease: "power3.out"
    });

    // Icon rotation on scroll
    gsap.to(visual.querySelector(".visual-icon"), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
        },
        rotation: 360,
        ease: "none"
    });
});

// Rotating divider animation
gsap.utils.toArray(".rotating-divider").forEach(divider => {
    gsap.from(divider, {
        scrollTrigger: {
            trigger: divider,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
});

// Free domain section animation
gsap.from(".free-domain-content", {
    scrollTrigger: {
        trigger: ".free-domain-section",
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".domain-feature", {
    scrollTrigger: {
        trigger: ".domain-features",
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
});

// Free services grid animation
gsap.from(".service-item", {
    scrollTrigger: {
        trigger: ".services-grid",
        start: "top 75%",
        end: "top 35%",
        toggleActions: "play none none reverse"
    },
    opacity: 100,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
});

// Limited offer section animation
gsap.from(".limited-offer-content", {
    scrollTrigger: {
        trigger: ".limited-offer-section",
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: "back.out(1.4)"
});

// ================= HAMBURGER MENU =================
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");
const links = document.querySelectorAll(".nav-menu a");

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

// Close menu on link click
links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    });
});

// Close menu on outside click
document.addEventListener("click", e => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    }
});

// ================= CURSOR GLOW =================
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// ================= BACK TO TOP BUTTON =================
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

// ================= SMOOTH SCROLLING FOR ANCHOR LINKS =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
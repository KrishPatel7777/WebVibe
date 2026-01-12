/* ============================================
   ULTRA-PREMIUM WORK PORTFOLIO - JAVASCRIPT
   ============================================ */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    init3DBackground();
    initScrollAnimations();
    initProjectAnimations();
    initFlagAnimations();
    initCTAAnimation();
});

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursor) return;
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow for dot
        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;
        
        // Slower follow for ring
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .tag');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ============================================
// 3D BACKGROUND WITH THREE.JS
// ============================================
function init3DBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || !window.THREE) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    camera.position.z = 5;
    
    // Create geometric particles
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Gold color (D5CEA3)
    const color = new THREE.Color(0xD5CEA3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        
        // Color
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xD5CEA3, 0.5);
    scene.add(ambientLight);
    
    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Scroll effect
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0003;
        
        // Mouse parallax
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        
        // Scroll parallax
        camera.position.y = scrollY * 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// SCROLL ANIMATIONS WITH GSAP
// ============================================
function initScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero title animation
    gsap.from('.hero-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Statement section
    gsap.from('.statement-content', {
        scrollTrigger: {
            trigger: '.statement-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Flags section
    gsap.from('.flag-wrapper', {
        scrollTrigger: {
            trigger: '.flags-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });
    
    // CTA section
    gsap.from('.cta-content', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
    });
}

// ============================================
// PROJECT CARDS ANIMATION
// ============================================
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0.0, 0.2, 1)';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        observer.observe(card);
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            // Could add subtle sound here if needed
        });
    });
    
    // Parallax effect on project images
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            if (image) {
                image.style.transform = `scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            }
        });
    });
}

// ============================================
// FLAG ANIMATIONS
// ============================================
function initFlagAnimations() {
    const flags = document.querySelectorAll('.flag');
    
    // Enhanced wave animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });
    
    flags.forEach(flag => {
        observer.observe(flag);
    });
    
    // Interactive tilt on hover
    const flagWrappers = document.querySelectorAll('.flag-wrapper');
    
    flagWrappers.forEach(wrapper => {
        const flag = wrapper.querySelector('.flag');
        
        wrapper.addEventListener('mouseenter', () => {
            if (flag) {
                flag.style.animation = 'flagWave 1s ease-in-out infinite';
            }
        });
        
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 10;
            const rotateX = (centerY - y) / 10;
            
            if (flag) {
                flag.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        wrapper.addEventListener('mouseleave', () => {
            if (flag) {
                flag.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg)';
            }
        });
    });
}

// ============================================
// CTA BUTTON ANIMATION
// ============================================
function initCTAAnimation() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (!ctaButton) return;
    
    // Magnetic button effect
    ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        ctaButton.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-3px)`;
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'translate(0, 0)';
    });
    
    // Click ripple effect
    ctaButton.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = ctaButton.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        ctaButton.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScroll = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll(lastScroll);
            ticking = false;
        });
        
        ticking = true;
    }
});

function handleScroll(scrollPos) {
    // Add any scroll-based effects here
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        if (scrollPos > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
}

// ============================================
// RIPPLE ANIMATION KEYFRAMES (ADD TO CSS)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PRELOAD OPTIMIZATION
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add any additional load optimizations here
    console.log('✨ Premium Portfolio Loaded Successfully');
});

// ============================================
// RESPONSIVE CHECKS
// ============================================
function checkMobile() {
    return window.innerWidth <= 768;
}

// Disable some effects on mobile for performance
if (checkMobile()) {
    // Simplify animations for mobile
    document.body.classList.add('mobile');
}

window.addEventListener('resize', () => {
    if (checkMobile()) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Respect reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
}

// Keyboard navigation enhancements
document.querySelectorAll('.project-link, .cta-button').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid var(--color-accent)';
        element.style.outlineOffset = '4px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// ============================================
// CONSOLE SIGNATURE
// ============================================
console.log('%c✨ Premium Portfolio ', 'background: #D5CEA3; color: #1A120B; font-size: 20px; padding: 10px;');
console.log('%cCrafted with passion and precision', 'color: #D5CEA3; font-size: 12px;');
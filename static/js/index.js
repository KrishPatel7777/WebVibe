// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all project items
document.querySelectorAll('.project-item').forEach(item => {
  observer.observe(item);
});

// Observe story phases
document.querySelectorAll('.story-phase').forEach(phase => {
  observer.observe(phase);
});

// Counter Animation for Hero Stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

// Start counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(stat => {
        animateCounter(stat);
      });
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Duplicate train coaches for seamless loop
const trainContainer = document.querySelector('.train-container');
if (trainContainer) {
  const coaches = Array.from(trainContainer.children);
  coaches.forEach(coach => {
    const clone = coach.cloneNode(true);
    trainContainer.appendChild(clone);
  });
}

// Parallax effect for spiral container
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const spiralContainer = document.querySelector('.spiral-container');
  
  if (spiralContainer) {
    const speed = 0.5;
    spiralContainer.style.transform = `translate(-50%, -50%) rotateY(${scrolled * speed}deg)`;
  }
});

// Enhanced hover effect for CTA buttons
const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-action');
ctaButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const glow = button.querySelector('.button-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4), transparent)`;
    }
  });
});

// Lab panel glow effect
const labPanels = document.querySelectorAll('.lab-panel');
labPanels.forEach(panel => {
  panel.addEventListener('mousemove', (e) => {
    const rect = panel.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const glow = panel.querySelector('.panel-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--glow), transparent 70%)`;
    }
  });
});

// Testimonial cards staggered animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 200);
      testimonialObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

testimonialCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = 'all 0.8s ease';
  testimonialObserver.observe(card);
});

// AI Avatar hologram pulse on scroll
const avatarSection = document.querySelector('.ai-avatar');
const hologramCore = document.querySelector('.hologram-core');

const avatarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const scrollProgress = (window.scrollY - avatarSection.offsetTop) / window.innerHeight;
      const scale = 1 + (scrollProgress * 0.2);
      if (hologramCore) {
        hologramCore.style.transform = `scale(${Math.max(1, Math.min(scale, 1.2))})`;
      }
    }
  });
}, { threshold: 0 });

if (avatarSection) {
  avatarObserver.observe(avatarSection);
  
  window.addEventListener('scroll', () => {
    if (avatarSection.getBoundingClientRect().top < window.innerHeight) {
      const scrollProgress = (window.scrollY - avatarSection.offsetTop) / window.innerHeight;
      const scale = 1 + (scrollProgress * 0.2);
      if (hologramCore) {
        hologramCore.style.transform = `scale(${Math.max(1, Math.min(scale, 1.2))})`;
      }
    }
  });
}

// CTA panels 3D tilt effect
const ctaPanels = document.querySelectorAll('.cta-panel');
ctaPanels.forEach(panel => {
  panel.addEventListener('mousemove', (e) => {
    const rect = panel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  panel.addEventListener('mouseleave', () => {
    panel.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Smooth scroll for anchor links (if any are added)
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

// Add visible class to elements when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero-content > *').forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 300);
});

// Initialize hero content animation
document.querySelectorAll('.hero-content > *').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.8s ease';
});

// Project items hover effect
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(0) rotateX(0) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotateX(0) scale(1)';
  });
});

// Train coach interaction
document.querySelectorAll('.train-coach').forEach(coach => {
  coach.addEventListener('click', function() {
    const techName = this.getAttribute('data-tech');
    console.log(`Technology selected: ${techName}`);
    // Add your interaction logic here
  });
});

// Add magnetic effect to primary CTA
const magneticButtons = document.querySelectorAll('.cta-primary');
magneticButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.15;
    const moveY = y * 0.15;
    
    button.style.transform = `translateY(-5px) translate(${moveX}px, ${moveY}px)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0) translate(0, 0)';
  });
});

// Scroll progress indicator (optional enhancement)
function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  
  // You can use this for a progress bar if needed
  console.log(`Scroll progress: ${scrollProgress}%`);
}

window.addEventListener('scroll', updateScrollProgress);

// Performance optimization: Throttle scroll events
let ticking = false;
function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Scroll-based animations here
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Accessibility: Keyboard navigation for interactive elements
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.classList.contains('cta-primary') || 
        e.target.classList.contains('cta-secondary') ||
        e.target.classList.contains('cta-action')) {
      e.target.click();
    }
  }
});

// Console welcome message
console.log('%c Welcome to Studios ', 'background: #D5CEA3; color: #1A120B; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Where Web Development Meets AI ', 'background: #3C2A21; color: #E5E5CB; font-size: 14px; padding: 5px;');
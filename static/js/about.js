// ================= INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =================
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.story-content, .mv-card, .reason-item, .team-member').forEach(el => {
  animateOnScroll.observe(el);
});

// ================= 3D CUBE MOUSE TRACKING + AUTO ROTATION =================
const cube = document.querySelector('.visual-cube');
const storyVisual = document.querySelector('.story-visual');

if (cube && storyVisual) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let autoRotationY = 0;
  let isHovering = false;

  storyVisual.addEventListener('mousemove', (e) => {
    isHovering = true;
    const rect = storyVisual.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -60;
  });

  storyVisual.addEventListener('mouseleave', () => {
    isHovering = false;
    mouseX = 0;
    mouseY = 0;
  });

  function animateCube() {
    // Auto rotation (continuous)
    autoRotationY += 0.3;
    
    // If hovering, blend mouse control with auto rotation
    if (isHovering) {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;
      cube.style.transform = `rotateX(${currentY}deg) rotateY(${currentX + autoRotationY}deg)`;
    } else {
      // Only auto rotation when not hovering
      currentX += (0 - currentX) * 0.05;
      currentY += (0 - currentY) * 0.05;
      cube.style.transform = `rotateX(${currentY}deg) rotateY(${autoRotationY}deg)`;
    }
    
    requestAnimationFrame(animateCube);
  }

  animateCube();
}

// ================= MISSION/VISION CARD 3D TILT EFFECT =================
const mvCards = document.querySelectorAll('.mv-card');

mvCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// ================= REASON ITEMS ORBITAL ANIMATION ON HOVER =================
const reasonItems = document.querySelectorAll('.reason-item');

reasonItems.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    // Create orbital particles
    const numParticles = 8;
    const existingParticles = item.querySelectorAll('.orbital-particle');
    
    if (existingParticles.length === 0) {
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'orbital-particle';
        particle.style.cssText = `
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--sand);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          pointer-events: none;
          animation: orbit${i} 3s linear infinite;
        `;
        
        // Create unique orbit animation
        const angle = (360 / numParticles) * i;
        const style = document.createElement('style');
        style.textContent = `
          @keyframes orbit${i} {
            0% {
              transform: translate(-50%, -50%) rotate(${angle}deg) translateX(150px) rotate(-${angle}deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(${angle + 360}deg) translateX(150px) rotate(-${angle + 360}deg);
            }
          }
        `;
        document.head.appendChild(style);
        
        item.appendChild(particle);
      }
    }
  });
  
  item.addEventListener('mouseleave', () => {
    const particles = item.querySelectorAll('.orbital-particle');
    particles.forEach(particle => {
      particle.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => particle.remove(), 500);
    });
  });
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: scale(0);
    }
  }
`;
document.head.appendChild(fadeOutStyle);

// ================= TEAM MEMBER CARDS DEPTH EFFECT =================
const teamMembers = document.querySelectorAll('.member-card');

teamMembers.forEach(member => {
  member.addEventListener('mousemove', (e) => {
    const rect = member.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((y - centerY) / centerY) * -15;
    
    member.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
    member.style.transition = 'transform 0.1s ease';
  });
  
  member.addEventListener('mouseleave', () => {
    member.style.transform = 'translateY(0) rotateX(0) rotateY(0) translateZ(0)';
    member.style.transition = 'transform 0.5s ease';
  });
});

// ================= SMOOTH PARALLAX SCROLL EFFECT =================
let ticking = false;
let scrollY = window.scrollY;

function updateParallax() {
  const orbs = document.querySelectorAll('.orb');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (orbs.length > 0) {
    orbs.forEach((orb, index) => {
      const speed = 0.5 + (index * 0.2);
      const yPos = scrollY * speed;
      orb.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  if (scrollIndicator) {
    const opacity = Math.max(0, 1 - scrollY / 300);
    scrollIndicator.style.opacity = opacity;
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// ================= REASON NUMBERS COUNTER ANIMATION =================
const reasonNumbers = document.querySelectorAll('.reason-number');

reasonNumbers.forEach(number => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateNumber(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(number);
});

function animateNumber(element) {
  const finalNumber = parseInt(element.textContent);
  let currentNumber = 0;
  const duration = 1500;
  const increment = finalNumber / (duration / 16);
  
  const timer = setInterval(() => {
    currentNumber += increment;
    if (currentNumber >= finalNumber) {
      element.textContent = String(finalNumber).padStart(2, '0');
      clearInterval(timer);
    } else {
      element.textContent = String(Math.floor(currentNumber)).padStart(2, '0');
    }
  }, 16);
}

// ================= SPIRAL ENTRANCE FOR WHY CHOOSE SECTION =================
const reasonsGrid = document.querySelector('.reasons-grid');

if (reasonsGrid) {
  const spiralObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('spiral-animated')) {
        entry.target.classList.add('spiral-animated');
        
        const items = entry.target.querySelectorAll('.reason-item');
        items.forEach((item, index) => {
          const angle = (index * 72) * (Math.PI / 180); // 360/5 = 72 degrees
          const radius = 50;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          item.style.setProperty('--spiral-x', `${x}px`);
          item.style.setProperty('--spiral-y', `${y}px`);
        });
      }
    });
  }, { threshold: 0.3 });
  
  spiralObserver.observe(reasonsGrid);
}

// ================= CONSTELLATION LINES FOR TEAM SECTION =================
const teamConstellation = document.querySelector('.team-constellation');

if (teamConstellation) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.3';
  teamConstellation.insertBefore(canvas, teamConstellation.firstChild);
  
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = teamConstellation.offsetWidth;
    canvas.height = teamConstellation.offsetHeight;
    drawConstellation();
  }
  
  function drawConstellation() {
    if (window.innerWidth < 992) return; // Skip on mobile
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const members = teamConstellation.querySelectorAll('.team-member');
    const positions = [];
    
    members.forEach(member => {
      const rect = member.getBoundingClientRect();
      const containerRect = teamConstellation.getBoundingClientRect();
      positions.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      });
    });
    
    if (positions.length >= 2) {
      ctx.strokeStyle = '#D5CEA3';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 10]);
      
      // Draw lines between all members
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  window.addEventListener('resize', resizeCanvas);
  
  // Wait for team members to be positioned
  setTimeout(() => {
    resizeCanvas();
  }, 1000);

  const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});
  
  // Redraw on scroll to handle any position changes
  const constellationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(drawConstellation, 100);
      }
    });
  }, { threshold: 0.1 });
  
  constellationObserver.observe(teamConstellation);
}

// ================= HERO TITLE 3D DEPTH ON MOUSE MOVE =================
const heroTitle = document.querySelector('.hero-title');
const heroSection = document.querySelector('.hero-section');

if (heroTitle && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    heroTitle.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  
  heroSection.addEventListener('mouseleave', () => {
    heroTitle.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  });
}

// ================= PERFORMANCE OPTIMIZATION =================
// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Trigger any resize-dependent updates
    updateParallax();
  }, 250);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial parallax calculation
  updateParallax();
  
  // Add loaded class for any initial animations
  document.body.classList.add('loaded');
});
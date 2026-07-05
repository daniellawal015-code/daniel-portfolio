document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SET CURRENT YEAR IN FOOTER
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2. MOBILE MENU TOGGLE
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      navToggle.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // 3. SCROLL REVEAL ANIMATIONS
  const revealElements = () => {
    const sections = document.querySelectorAll('.section, .project-card');
    sections.forEach(elem => {
      if (!elem.classList.contains('reveal')) elem.classList.add('reveal');
      
      const elementTop = elem.getBoundingClientRect().top;
      if (elementTop < window.innerHeight * 0.85) {
        elem.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealElements);
  revealElements(); // Run once on load
});
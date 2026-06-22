/* =========================================
   ANA V SAS — Main JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  // --- Check prefers-reduced-motion ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion');
    return;
  }

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => header.classList.add('header--scrolled'),
    onLeaveBack: () => header.classList.remove('header--scrolled'),
  });

  // --- Hamburger menu toggle ---
  const hamburger = document.getElementById('hamburgerBtn');
  const nav = document.querySelector('.header__nav-pill');
  const overlay = document.getElementById('menuOverlay');

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !nav.classList.contains('open');
    nav.classList.toggle('open', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    overlay.classList.toggle('visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', () => toggleMenu());
  overlay?.addEventListener('click', () => toggleMenu(false));

  // --- Smooth scroll for nav links + close menu on mobile ---
  document.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Si es un anchor interno (#seccion)
      if (href.startsWith('#')) {
        e.preventDefault();
        toggleMenu(false); // cierra menú mobile
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --- Smooth scroll for "Ver cómo funciona" ---
  document.querySelector('.hero__cta-secondary')?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#como-funciona');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

});
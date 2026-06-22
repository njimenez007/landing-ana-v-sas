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
    // Skip all GSAP animations
    return;
  }

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => header.classList.add('header--scrolled'),
    onLeaveBack: () => header.classList.remove('header--scrolled'),
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

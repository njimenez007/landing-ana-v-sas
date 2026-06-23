/* ============================================
   ANA V SAS — Effects JS
   3D Tilt Cards, Background Shifts, Misc
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. 3D Tilt on service cards (desktop only) ---
  if (!reducedMotion && window.innerWidth >= 1024) {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `
          perspective(800px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
        `;
        card.style.boxShadow = `
          0 12px 40px rgba(31,78,140,0.12),
          0 4px 12px rgba(0,0,0,0.06)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        card.style.boxShadow = '';
        // Smooth transition back
        card.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease-out';
        setTimeout(() => {
          card.style.transition = '';
        }, 400);
      });

      // Remove transition during mousemove for responsiveness
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow 0.2s ease';
      });
    });
  }

  // --- 2. Background shift observer (for smooth section transitions) ---
  const sections = document.querySelectorAll('.section--light');
  const sectionMarine = document.querySelectorAll('.section--marine');
  const footer = document.querySelector('.footer');

  // Pre-set marine background for smooth crossfade
  // Already handled by CSS on the sections themselves

  // --- 3. Active nav link highlight based on scroll ---
  const navLinks = document.querySelectorAll('.header__link:not(.header__link--cta)');
  const sections_map = new Map();

  // Build map of section id → nav link
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        sections_map.set(section, link);
      }
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = sections_map.get(entry.target);
        if (link) {
          navLinks.forEach(l => l.style.opacity = '0.6');
          link.style.opacity = '1';
        }
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections_map.forEach((_, section) => {
    observer.observe(section);
  });

  // --- 4. Counter bar fill alternative (if GSAP didn't work) ---
  // This is handled in sections.js via GSAP

  // --- 5. Smooth reveal for remaining generic .reveal elements ---
  // This is handled by the section header/footer reveals in sections.js

  console.log('ANA V SAS — Landing loaded successfully 🚀');
});
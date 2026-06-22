/* =========================================
   ANA V SAS — Animaciones de Cards
   ========================================= */

(function() {
  'use strict';

  // --- Cards del problema ---
  document.querySelectorAll('#problemaCards .card').forEach((card) => {
    const delay = parseInt(card.dataset.delay || 0, 10) / 1000;
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: delay,
      ease: 'power2.out',
    });
  });

  // --- Cards de servicios ---
  document.querySelectorAll('#serviciosCards .card').forEach((card) => {
    const delay = parseInt(card.dataset.delay || 0, 10) / 1000;
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: delay,
      ease: 'power2.out',
    });
  });

  // --- Sectores (clientes) ---
  document.querySelectorAll('#sectores .sector').forEach((sector) => {
    const delay = parseInt(sector.dataset.delay || 0, 10) / 1000;
    gsap.to(sector, {
      scrollTrigger: {
        trigger: sector,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: delay,
      ease: 'power2.out',
    });
  });

})();
/* =========================================
   ANA V SAS — Transición Hero → Problema
   ========================================= */

(function() {
  'use strict';

  // Animación de las cards del problema
  const problemaCards = document.querySelectorAll('#problemaCards .card');
  problemaCards.forEach((card) => {
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

})();
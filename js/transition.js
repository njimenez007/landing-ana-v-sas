/* =========================================
   ANA V SAS — Transición Hero → Problema
   ========================================= */

(function() {
  'use strict';

  const overlay = document.getElementById('transitionOverlay');
  const problemaSection = document.getElementById('problema');
  const video = document.getElementById('transitionVideo');

  if (!overlay || !problemaSection) return;

  // Mostrar overlay de transición cuando scrolleamos del Hero al Problema
  ScrollTrigger.create({
    trigger: problemaSection,
    start: 'top bottom',
    end: 'top 20%',
    onEnter: () => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      if (video && video.src) {
        video.currentTime = 0;
        video.play();
      }
    },
    onLeave: () => {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      if (video && video.src) video.pause();
    },
    onEnterBack: () => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      if (video && video.src) {
        video.currentTime = 0;
        video.play();
      }
    },
    onLeaveBack: () => {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      if (video && video.src) video.pause();
    },
  });

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
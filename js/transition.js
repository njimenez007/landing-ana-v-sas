/* =========================================
   ANA V SAS — Scroll-Driven Video + Cards
   ========================================= */

(function() {
  'use strict';

  const video = document.getElementById('bgVideo');
  const problemaSection = document.getElementById('problema');

  if (!video || !problemaSection) return;

  // Pausar el video — solo avanza con el scroll, no por tiempo
  video.pause();

  // --- Video sincronizado con el scroll ---
  function setupScrollVideo() {
    const duration = video.duration || 8;

    ScrollTrigger.create({
      trigger: problemaSection,
      start: 'top bottom',     // arranca cuando el problema asoma (hero aún visible)
      end: 'bottom top',       // termina cuando el problema desaparece arriba
      scrub: 1.5,              // suavizado para que se sienta fluido
      onUpdate: (self) => {
        // Mapea el progreso del scroll (0→1) al tiempo del video (0→duración)
        video.currentTime = self.progress * duration;
      },
    });
  }

  // Esperar a que el video cargue metadata para saber su duración
  if (video.readyState >= 1) {
    setupScrollVideo();
  } else {
    video.addEventListener('loadedmetadata', setupScrollVideo);
  }

  // --- Animación de las cards del problema ---
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
/* =========================================
   ANA V SAS — Hero Animations
   ========================================= */

(function() {
  'use strict';

  const heroContent = document.querySelector('.hero__content');

  if (!heroContent) return;

  // Content fade in on load
  gsap.from(heroContent.children, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
  });

})();
/* =========================================
   ANA V SAS — Hero Animations
   ========================================= */

(function() {
  'use strict';

  const hero = document.getElementById('hero');
  const routePath = document.querySelector('.hero__route-path');
  const ship = document.querySelector('.hero__ship');
  const mapBg = document.querySelector('.hero__map-img');
  const heroContent = document.querySelector('.hero__content');

  if (!routePath || !ship) return;

  // Animate route drawing on load
  const routeLength = routePath.getTotalLength();
  gsap.set(routePath, { strokeDasharray: routeLength, strokeDashoffset: routeLength });

  // Map fade in
  if (mapBg) {
    gsap.fromTo(mapBg, { opacity: 0 }, { opacity: 0.15, duration: 1.2, ease: 'power2.out' });
  }

  // Content fade in
  if (heroContent) {
    gsap.from(heroContent.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  }

  // --- Scroll scrub: route drawing + ship movement ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  // Route draws
  tl.to(routePath, {
    strokeDashoffset: 0,
    duration: 1,
    ease: 'none',
  }, 0);

  // Ship moves along the path
  tl.to(ship, {
    motionPath: {
      path: routePath.getAttribute('d'),
      align: routePath,
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
    },
    duration: 1,
    ease: 'none',
  }, 0);

})();

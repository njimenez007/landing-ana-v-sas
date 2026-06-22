/* =========================================
   ANA V SAS — Timeline Animations
   ========================================= */

(function() {
  'use strict';

  const timelineSection = document.getElementById('como-funciona');
  const track = document.getElementById('timelineTrack');
  const steps = document.querySelectorAll('.timeline__step');

  if (!track || steps.length === 0) return;

  // Check if mobile
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  if (isMobile) {
    // Mobile: Vertical reveal with scroll
    steps.forEach((step, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out',
      });

      // Step visual animations
      animateStepVisuals(step, i);
    });
  } else {
    // Desktop: Horizontal scroll hijacking with pin + scrub
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    gsap.to(track, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: timelineSection,
        pin: true,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    // Animate each step as it enters view
    steps.forEach((step, i) => {
      const stepContent = step.querySelector('.timeline__content');
      const stepVisual = step.querySelector('.timeline__visual');

      gsap.from(stepContent, {
        scrollTrigger: {
          trigger: step,
          containerAnimation: ScrollTrigger.getById(timelineSection.id),
          start: 'left center',
          end: 'center center',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power2.out',
      });

      animateStepVisuals(step, i);
    });
  }

  function animateStepVisuals(step, index) {
    switch (index) {
      case 0: break; // Plane - SVG animation handled in timeline html
      case 1: break; // Ship
      case 2: break; // Forklift
      case 3: break; // Truck
    }
  }

})();

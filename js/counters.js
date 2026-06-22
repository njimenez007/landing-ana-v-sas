/* =========================================
   ANA V SAS — Animated Counters
   ========================================= */

(function() {
  'use strict';

  const countersSection = document.getElementById('diferenciadores');
  const counters = document.querySelectorAll('.counter');
  const counterBars = document.querySelectorAll('.counter__bar');

  if (counters.length === 0) return;

  // --- Cascading bar animations ---
  const barTl = gsap.timeline({
    scrollTrigger: {
      trigger: countersSection,
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
  });

  counterBars.forEach((bar, i) => {
    barTl.to(bar, {
      width: '60px',
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.2,
    }, 0);
  });

  // --- Counter number animations ---
  counters.forEach(counter => {
    const numEl = counter.querySelector('.counter__num');
    const target = parseInt(counter.dataset.target, 10);
    const suffix = counter.dataset.suffix || '';

    // Skip 24/7 and 100% (display only)
    if (numEl.textContent === '24/7' || target === 100) {
      return;
    }

    let startValue = { val: 0 };
    let endValue = target;

    gsap.to(startValue, {
      val: endValue,
      duration: target === 1 ? 0.5 : 1.5,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: function() {
        const current = Math.round(startValue.val);
        numEl.textContent = current + suffix;
      },
      onComplete: function() {
        numEl.textContent = target + suffix;
      },
    });
  });

})();

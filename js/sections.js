/* ============================================
   ANA V SAS — Sections JS
   Stagger Reveals, Timeline Scrub, Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || typeof gsap === 'undefined') {
    // Show all reveals immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }

  // --- Helper: batch reveal with stagger ---
  function staggerReveal(selector, options = {}) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const { 
      start = 'top 90%', 
      stagger = 0.15, 
      duration = 0.5,
      y = 30,
      once = true,
      from = 0
    } = options;

    gsap.fromTo(els, 
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: els[0].closest('.section') || els[0].parentElement,
          start,
          once,
        }
      }
    );
  }

  // --- 1. Problema cards stagger ---
  staggerReveal('#problemaCards .card', {
    start: 'top 85%',
    stagger: 0.15,
    duration: 0.5,
    y: 30,
  });

  // --- 2. Cómo funciona timeline ---
  const timelineSteps = document.querySelectorAll('.timeline__step');
  const timelineLine = document.getElementById('timelineLine');

  if (timelineSteps.length) {
    // Reveal steps with scrub
    timelineSteps.forEach((step, i) => {
      gsap.fromTo(step,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1.5,
            once: true,
          }
        }
      );
    });

    // Line connector progress
    if (timelineLine) {
      const lineBar = timelineLine.querySelector('::after') || timelineLine;
      gsap.fromTo(timelineLine,
        { '--progress': '0%' },
        {
          '--progress': '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
            once: true,
            onUpdate: (self) => {
              const progress = self.progress * 100;
              const afterEl = timelineLine.querySelector('::after');
              // Use a style attr to update pseudo-element
              timelineLine.style.setProperty('--line-progress', `${progress}%`);
              const pseudo = timelineLine.querySelector('.timeline__line-fill') || (() => {
                const fill = document.createElement('div');
                fill.className = 'timeline__line-fill';
                fill.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:0%;background:linear-gradient(to bottom, var(--marine-light), var(--marine));border-radius:2px;';
                timelineLine.appendChild(fill);
                return fill;
              })();
              pseudo.style.height = `${progress}%`;
            }
          }
        }
      );
    }
  }

  // --- 3. Servicios cards stagger diagonal ---
  const servicioCards = document.querySelectorAll('#serviciosCards .card');
  if (servicioCards.length) {
    gsap.fromTo(servicioCards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: {
          each: 0.15,
          from: 'start'
        },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#serviciosCards',
          start: 'top 85%',
          once: true,
        }
      }
    );
  }

  // --- 4. Counters animation ---
  const counters = document.querySelectorAll('.counter__value');
  const counterBars = document.querySelectorAll('.counter__bar');

  if (counters.length) {
    const counterSection = document.getElementById('counters');

    const animateCounters = () => {
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        if (isNaN(target)) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val);
          },
          onComplete: () => {
            counter.textContent = target;
          }
        });
      });

      // Bars
      counterBars.forEach((bar, i) => {
        gsap.fromTo(bar,
          { '--bar-w': '0%' },
          {
            '--bar-w': '100%',
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power2.out',
            onUpdate: function() {
              const after = bar.querySelector('.counter__bar-fill') || (() => {
                const fill = document.createElement('div');
                fill.className = 'counter__bar-fill';
                fill.style.cssText = 'position:absolute;top:0;left:0;height:100%;width:0%;background:#E8A838;border-radius:2px;';
                bar.appendChild(fill);
                return fill;
              })();
              const progress = gsap.getProperty(bar, '--bar-w');
              after.style.width = progress;
            }
          }
        );
      });
    };

    ScrollTrigger.create({
      trigger: counterSection,
      start: 'top 75%',
      once: true,
      onEnter: animateCounters,
    });
  }

  // --- 5. Sectors stagger reveal ---
  staggerReveal('#sectors .sector', {
    start: 'top 85%',
    stagger: 0.12,
    duration: 0.4,
    y: 20,
  });

  // --- 6. Footer reveal ---
  const footerContent = document.querySelector('.footer__content');
  if (footerContent) {
    gsap.fromTo(footerContent,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 85%',
          once: true,
        }
      }
    );
  }

  // --- 7. Section header reveals ---
  document.querySelectorAll('.section__header').forEach(header => {
    gsap.fromTo(header,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        }
      }
    );
  });

  // --- 8. Section footer reveals ---
  document.querySelectorAll('.section__footer').forEach(footer => {
    gsap.fromTo(footer,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          once: true,
        }
      }
    );
  });

});
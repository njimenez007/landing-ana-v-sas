/* ==========================================================================
   ANA V SAS — SECTIONS ANIMATIONS
   ScrollTrigger Stagger Reveals, Timeline Scrub & Counters Dynamic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Si prefiere Reduced Motion, o si GSAP no está cargado, cancelamos las animaciones
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Revelar todos los elementos .reveal inmediatamente de forma estática
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // --- 1. REVELACIÓN EN CASCADA (STAGGER) GENERAL DE SECCIONES ---
  // Automatizamos que todos los encabezados de sección tengan un suave reveal
  document.querySelectorAll('.section__header.reveal, .section__footer.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  // --- 2. SECCIÓN: CARDS DE DOLOR (PROBLEMAS) ---
  const problemaCards = document.querySelectorAll('#problemaCards .card');
  if (problemaCards.length) {
    gsap.fromTo(problemaCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#problemaCards',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // --- 3. SECCIÓN: TIMELINE VERTICAL DINÁMICA ---
  const timelineSteps = document.querySelectorAll('.timeline__step');
  const timelineBar = document.getElementById('timelineBar');

  if (timelineSteps.length && timelineBar) {
    // 3.1. Scrub de progreso para la barra de la timeline
    gsap.fromTo(timelineBar,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#timeline',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true
        }
      }
    );

    // 3.2. Activación física de cada paso al scrollear por él
    timelineSteps.forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 65%',
        end: 'bottom 55%',
        onEnter: () => step.classList.add('is-active'),
        onLeaveBack: () => step.classList.remove('is-active'),
        // No forzamos que se oculten estáticamente para mantener legibilidad
        once: false
      });

      // Suave revelado de cada paso
      gsap.fromTo(step,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            once: true
          }
        }
      );
    });
  }

  // --- 4. SECCIÓN: GRILLA DE SERVICIOS (STAGGER EN DIAGONAL) ---
  const serviciosCards = document.querySelectorAll('#serviciosCards .card');
  if (serviciosCards.length) {
    gsap.fromTo(serviciosCards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: {
          each: 0.15,
          grid: [2, 2] // Realiza revelado en diagonal sutil para grid 2x2
        },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#serviciosCards',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // --- 5. SECCIÓN: INDICADORES / CONTADORES PREMIUM ---
  const countersGrid = document.getElementById('countersGrid');
  const counterItems = document.querySelectorAll('.counter-item');

  if (countersGrid && counterItems.length) {
    // Reveal de los items en stagger
    gsap.fromTo(counterItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: countersGrid,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            // Cuando los ítems entren en el viewport, ejecutamos el conteo
            animateNumericCounters();
            animateCounterBars();
          }
        }
      }
    );

    // 5.1. Conteo interpolado con GSAP
    const animateNumericCounters = () => {
      document.querySelectorAll('.counter-item__num').forEach(numElement => {
        const isStatic = numElement.getAttribute('data-is-static') === 'true';
        if (isStatic) return; // Si es estático ("100%", "24/7"), no contar

        const targetValue = parseInt(numElement.getAttribute('data-target'), 10);
        if (isNaN(targetValue)) return;

        const countObject = { value: 0 };
        gsap.to(countObject, {
          value: targetValue,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            // Interpolamos y agregamos el signo "+" para el indicador de años
            numElement.textContent = Math.floor(countObject.value) + (targetValue > 1 ? '+' : '');
          },
          onComplete: () => {
            numElement.textContent = targetValue + (targetValue > 1 ? '+' : '');
          }
        });
      });
    };

    // 5.2. Expansión secuencial de las barritas doradas decorativas
    const animateCounterBars = () => {
      document.querySelectorAll('.counter-item__bar').forEach((bar, index) => {
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power3.out'
          }
        );
      });
    };
  }

  // --- 6. SECCIÓN: SECTORES DEL CLIENTE ---
  const sectorItems = document.querySelectorAll('.sector-item');
  if (sectorItems.length) {
    gsap.fromTo(sectorItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sectors-list',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // --- 7. CARGA ELEGANTE DEL FOOTER / ENTRADA SUAVE ---
  const footerContent = document.querySelector('.footer__content');
  if (footerContent) {
    gsap.fromTo(footerContent,
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#contacto',
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  console.log('ANA V SAS — Animaciones estructuradas con éxito v2 🎬');
});
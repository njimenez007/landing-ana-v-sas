/* ==========================================================================
   ANA V SAS — MAIN JAVASCRIPT
   Inicialización general, Header, Menú Móvil & Floating Sticky CTA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- VARIABLES CLAVE ---
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.getElementById('headerNav');
  const stickyCta = document.getElementById('stickyCta');
  const hero = document.getElementById('hero');
  const heroBg = document.querySelector('.hero__bg-container');
  
  // Condicional de Reduced Motion preferida por el usuario
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- CONFIGURACIÓN DE GSAP ---
  // Inicialización o registro de complementos en caso de que estén disponibles
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // --- 1. COMPORTAMIENTO DEL HEADER AL SCROLLEAR ---
  const handleHeaderScroll = () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 80) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  // --- 2. MENÚ MÓVIL RESPONSIVE ---
  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = headerNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.header__link').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar menú al hacer clic en cualquier parte del body
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        headerNav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. MOSTRAR FLOATING STICKY CTA AL SCROLLEAR ---
  const handleStickyCtaVisibility = () => {
    if (!stickyCta || !hero) return;
    const heroHeight = hero.offsetHeight;
    const scrollPos = window.scrollY;

    // Se muestra cuando el usuario scrollea más allá del 70% de la altura del Hero
    if (scrollPos > (heroHeight * 0.7)) {
      stickyCta.classList.add('is-visible');
    } else {
      stickyCta.classList.remove('is-visible');
    }
  };

  // --- 4. PARALLAX SUAVE EN EL BG DEL HERO ---
  const handleHeroParallax = () => {
    if (!heroBg || prefersReducedMotion) return;
    const scrollPos = window.scrollY;
    // Parallax suave reduciendo el velocidad a un 25%
    const yTransform = scrollPos * 0.25;
    heroBg.style.transform = `translate3d(0, ${yTransform}px, 0)`;
  };

  // --- 5. REVELADO ASÍNCRONO DEL CONTENIDO DEL HERO (REVEAL DIRECTO) ---
  const revealHeroElements = () => {
    // Si prefiere Reduced Motion, no aplicar animaciones complejas
    if (prefersReducedMotion) {
      return; // El CSS se encargará de mostrarlo estático
    }

    if (typeof gsap !== 'undefined') {
      const heroTitle = document.getElementById('heroTitle');
      const heroSub = document.getElementById('heroSub');
      const heroCtas = document.getElementById('heroCtas');

      // Animamos elegantemente las líneas del hero de forma secuencial
      const titleLines = heroTitle ? heroTitle.querySelectorAll('.hero__title-line') : [];

      const heroTimeline = gsap.timeline({ delay: 0.2 });

      if (titleLines.length) {
        heroTimeline.fromTo(titleLines, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }

      if (heroSub) {
        heroTimeline.fromTo(heroSub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (heroCtas) {
        heroTimeline.fromTo(heroCtas,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );
      }
    }
  };

  // --- EVENTOS DEL SISTEMA OPTIMIZADOS ---
  const scrollHandler = () => {
    handleHeaderScroll();
    handleStickyCtaVisibility();
    handleHeroParallax();
  };

  // Agregamos listeners con passive para optimizar el hilo de renderizado
  window.addEventListener('scroll', scrollHandler, { passive: true });
  
  // Aseguramos llamadas en el primer frame
  handleHeaderScroll();
  handleStickyCtaVisibility();
  
  // Inicializamos revelado
  revealHeroElements();

  console.log('ANA V SAS — Core iniciado 🚀');
});
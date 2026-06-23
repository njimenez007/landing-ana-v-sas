/* ============================================
   ANA V SAS — Main JS
   GSAP Init, Header, Smooth Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Check reduced motion ---
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Register GSAP plugins ---
  if (typeof gsap !== 'undefined' && !reducedMotion) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  const updateHeader = () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.getElementById('headerNav');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      headerNav.classList.toggle('is-open');
      document.body.style.overflow = headerNav.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close on link click
    headerNav.querySelectorAll('.header__link').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Sticky CTA visibility ---
  const stickyCta = document.getElementById('stickyCta');
  const hero = document.getElementById('hero');

  if (stickyCta && hero) {
    const heroBottom = () => hero.getBoundingClientRect().bottom;

    const toggleSticky = () => {
      if (heroBottom() < 100) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', toggleSticky, { passive: true });
    toggleSticky();
  }

  // --- Hero parallax ---
  const heroBg = document.getElementById('heroBg');

  if (heroBg && !reducedMotion) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const yOffset = scrolled * 0.3;
      heroBg.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    }, { passive: true });
  }

  // --- Hero text reveal ---
  if (!reducedMotion && typeof gsap !== 'undefined') {
    const titleLines = document.querySelectorAll('.hero__title-line');
    const heroSub = document.getElementById('heroSub');
    const heroCtas = document.querySelector('.hero__ctas');

    const heroTl = gsap.timeline({ delay: 0.3 });

    titleLines.forEach((line, i) => {
      const wrapper = line;
      // Create a reveal mask effect
      heroTl.fromTo(line,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out' },
        i * 0.15
      );
    });

    heroTl.fromTo(heroSub,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    heroTl.fromTo(heroCtas,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
  } else if (reducedMotion) {
    // Show everything immediately
    document.querySelectorAll('.hero__title-line').forEach(el => {
      el.style.clipPath = 'inset(0 0% 0 0)';
    });
    document.getElementById('heroSub').style.opacity = 1;
    document.querySelector('.hero__ctas').style.opacity = 1;
  }

  // --- Smooth scroll for nav links (fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

});
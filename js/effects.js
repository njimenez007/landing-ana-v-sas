/* ==========================================================================
   ANA V SAS — EFFECTS JAVASCRIPT
   Efecto 3D Tilt Hover interactivo & Resaltado Dinámico de Nav Links
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. EFECTO INTERACTIVO 3D TILT EN CARDS DE SERVICIOS (DESKTOP) ---
  // Solo se implementa en desktop (ancho >= 1024px) y si no prefiere reduced motion
  if (!prefersReducedMotion && window.innerWidth >= 1024) {
    const serviceCards = document.querySelectorAll('.tilt-card');

    serviceCards.forEach(card => {
      // Listener de movimiento para calcular coordenadas locales del mouse
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Coordenadas locales
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Convertimos a rangos de -0.5 a 0.5
        const percentX = (mouseX / rect.width) - 0.5;
        const percentY = (mouseY / rect.height) - 0.5;
        
        // Rotación máxima de 6 grados para un comportamiento premium (no excesivo)
        const maxRotation = 6;
        const rotateX = percentY * -maxRotation;
        const rotateY = percentX * maxRotation;
        
        // Efecto físico aplicando perspective
        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-6px)
        `;
        
        // Ajustamos la sombra de manera proporcional para simular elevación
        card.style.boxShadow = `
          0 20px 40px rgba(13, 43, 85, 0.12),
          0 10px 20px rgba(13, 43, 85, 0.06)
        `;
      });

      // El regreso a su eje debe ser sumamente suave
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)';
        card.style.boxShadow = '';
        
        // Removemos transiciones al re-entrar para evitar lag de refresco
        setTimeout(() => {
          card.style.transition = '';
        }, 500);
      });
      
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'box-shadow 0.3s ease-out';
      });
    });
  }

  // --- 2. RESALTADO DINÁMICO DEL NAV LINK ACTIVO (SCROLL SYNC) ---
  const navLinks = document.querySelectorAll('.header__link:not(.header__link--cta)');
  const sectionsToObserve = ['como-funciona', 'servicios', 'clientes'];
  const mappedSections = new Map();

  // Relacionamos los elementos del DOM de las secciones importantes
  sectionsToObserve.forEach(id => {
    const el = document.getElementById(id);
    const link = document.querySelector(`.header__link[href="#${id}"]`);
    if (el && link) {
      mappedSections.set(el, link);
    }
  });

  // Creamos un Intersection Observer configurado con ventana de entrada
  if (mappedSections.size > 0 && typeof IntersectionObserver !== 'undefined') {
    const observerOptions = {
      root: null,
      // Consideramos un offset similar a la altura del header (80px)
      rootMargin: '-100px 0px -40% 0px',
      threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remover la clase o el estilo activo previo
          navLinks.forEach(link => {
            link.style.opacity = '';
            link.classList.remove('active'); // Por si se requiere en CSS futuro
          });

          // Encendemos el link de la sección que cruza
          const activeLink = mappedSections.get(entry.target);
          if (activeLink) {
            activeLink.style.opacity = '1';
            activeLink.classList.add('active'); // Opcional para control alternativo
          }
        }
      });
    }, observerOptions);

    mappedSections.forEach((_, sectionObj) => {
      sectionObserver.observe(sectionObj);
    });
  }

  console.log('ANA V SAS — Módulos estéticos iniciados con éxito ✨');
});
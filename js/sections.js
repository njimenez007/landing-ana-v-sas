/**
 * Section reveals and timeline scrub
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return;

  // (La sección "El problema" — globo terráqueo — vive en js/globe.js)

  // 1b. Cierre del problema: fade-up del texto + botón (como el intro)
  const cierre = document.querySelector(".problema__footer-text");
  if (cierre) {
    const cta = cierre.parentElement.querySelector(".btn");
    gsap.set(cierre, { opacity: 0, y: 28 });
    if (cta) gsap.set(cta, { opacity: 0, y: 20 });

    const tlCierre = gsap.timeline({
      scrollTrigger: {
        trigger: ".problema__footer",
        start: "top 82%",
        toggleActions: "play none none reverse"
      }
    });
    tlCierre.to(cierre, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
    if (cta) tlCierre.to(cta, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
  }

  // 2. (La sección "Cómo funciona" — línea del tiempo horizontal — vive en js/proceso.js)

  // 3. (La sección "Qué coordinamos" — grúa + contenedor — vive en js/servicios.js)

  // 4. Diferenciadores feature blocks reveal
  gsap.to(".diferenciadores__col", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".diferenciadores__grid",
      start: "top 78%",
      toggleActions: "play none none none"
    }
  });

  // 5. Sectores Stagger Reveal
  gsap.to(".sectores__sector", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".sectores__grid",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

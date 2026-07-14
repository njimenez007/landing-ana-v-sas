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

  // 4. Diferenciadores: reveal de las stat cards + count-up de los números
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

  document.querySelectorAll(".diferenciadores .stat__number").forEach((el) => {
    const target = parseFloat(el.dataset.target) || 0;
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const useSep = el.dataset.sep === "1";
    const render = (n) => {
      const val = useSep ? Math.round(n).toLocaleString("es-CO") : String(Math.round(n));
      el.textContent = prefix + val + suffix;
    };

    render(0); // arranca en 0 antes de entrar al viewport
    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => render(counter.val),
          onComplete: () => render(target)
        });
      }
    });
  });
});

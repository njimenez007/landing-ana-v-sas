/**
 * Qué coordinamos — la grúa baja el contenedor ANA V y aparecen los servicios.
 * Sin pin: el descenso va con scrub mientras la sección entra al viewport
 * (compacto, todo dentro de la misma sección). Los cables/polea vienen en el
 * propio render del contenedor. Fallback estático en mobile / reduced motion.
 */

document.addEventListener("DOMContentLoaded", () => {
  const stage = document.getElementById("grua-stage");
  const scene = document.getElementById("grua-scene");
  const rig = document.getElementById("grua-rig");
  const pendulo = document.getElementById("grua-pendulo");
  if (!stage || !scene || !rig || !window.gsap || !window.ScrollTrigger) return;

  const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isStatic = isReduced || window.innerWidth < 900;

  const cards = gsap.utils.toArray(".servicio");
  const footer = document.querySelector(".que-coordinamos__footer");

  // Todo visible por defecto: en estático no hay nada que animar
  if (isStatic) return;

  // El globo (sección anterior) crea su pin async (espera el fetch del SVG),
  // así que queda registrado de último y el refresh no compensa sus 7600px de
  // pin en los triggers de esta sección. Reordenamos por posición real en el
  // documento y recalculamos cuando la página termina de cargar.
  window.addEventListener("load", () => {
    ScrollTrigger.sort((a, b) => {
      if (!a.trigger || !b.trigger) return 0;
      return a.trigger.compareDocumentPosition(b.trigger) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    ScrollTrigger.refresh();
  });

  // 1) Título y subtítulo entran mientras la sección asoma
  gsap.set("#grua-title", { opacity: 0, y: 36 });
  gsap.set("#grua-sub", { opacity: 0, y: 28 });
  gsap.timeline({
    scrollTrigger: { trigger: stage, start: "top 88%", end: "top 45%", scrub: 0.4, refreshPriority: -5 }
  })
    .to("#grua-title", { opacity: 1, y: 0, duration: 1.1, ease: "power1.out" }, 0)
    .to("#grua-sub", { opacity: 1, y: 0, duration: 0.9, ease: "power1.out" }, 0.55);

  // 2) Descenso suave, sin pin: la grúa baja el contenedor UNA sola vez cuando
  //    la escena entra. No es reversible: al volver a subir, el contenedor se
  //    queda asentado. Arranca escondido por el clip de la escena (y negativa)
  //    y emerge por debajo del texto del header.
  const drop = () => rig.offsetHeight + 100;
  gsap.set(rig, { y: () => -drop() });

  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top 78%",
      once: true,
      refreshPriority: -5
    }
  })
    // baja colgado, frenando bien suave al llegar
    .to(rig, { y: 0, duration: 0.9, ease: "power3.out" }, 0)
    // balanceo pendular (pivote en la polea) que se va calmando
    .to(pendulo, { rotation: 1.0, duration: 0.22, ease: "sine.inOut" }, 0.06)
    .to(pendulo, { rotation: -0.65, duration: 0.22, ease: "sine.inOut" }, 0.28)
    .to(pendulo, { rotation: 0.3, duration: 0.2, ease: "sine.inOut" }, 0.50)
    .to(pendulo, { rotation: 0, duration: 0.16, ease: "sine.out" }, 0.70)
    // se asienta: micro-hundimiento al recibir el peso
    .to(rig, { y: 7, duration: 0.05, ease: "power1.in" }, 0.90)
    .to(rig, { y: 0, duration: 0.05, ease: "power1.out" }, 0.95)
    // reproduce todo a ~mitad de velocidad para que sea lento y elegante
    .timeScale(0.5);

  // 2b) Vaivén idle permanente: el contenedor "respira" colgado del cable
  //     (va sobre la imagen, no sobre el péndulo, para no pelear con el scrub)
  gsap.fromTo(".grua-contenedor",
    { rotation: -0.4 },
    { rotation: 0.4, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });

  // 3) Tarjetas: la fila de 4 sube SOLO cuando el contenedor ya aterrizó
  gsap.set(cards, { opacity: 0, y: 60 });
  gsap.to(cards, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
    scrollTrigger: { trigger: scene, start: "top 32%", once: true, refreshPriority: -5 }
  });

  if (footer) {
    gsap.set(footer, { opacity: 0, y: 24 });
    gsap.to(footer, {
      opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: footer, start: "top 92%", once: true }
    });
  }
});

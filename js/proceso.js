/**
 * Cómo funciona — pipeline vertical (6 pasos).
 *
 * Una línea vertical con una "caja" que baja por ella ligada al scroll: al
 * bajar, la caja avanza, el relleno crece y cada paso aparece uno a uno.
 *
 * Animación de UNA SOLA VÍA: solo progresa cuando el usuario baja; cuando se
 * devuelve, se queda fija (no se revierte). Sin pin (no traba la página).
 *
 * Mobile / reduced-motion: lista vertical normal y estática (la caja y el
 * relleno quedan ocultos; solo se ajusta la línea tenue a los nodos).
 */
document.addEventListener("DOMContentLoaded", () => {
  const pipeline = document.getElementById("pipeline");
  if (!pipeline || !window.gsap || !window.ScrollTrigger) return;

  const steps = gsap.utils.toArray(".pipeline__step");
  const track = pipeline.querySelector(".pipeline__track");
  const fill = pipeline.querySelector(".pipeline__fill");
  const box = pipeline.querySelector(".pipeline__box");
  if (!steps.length || !fill || !box) return;

  // Centro vertical de cada nodo, relativo al tope del pipeline
  const centers = () => {
    const base = pipeline.getBoundingClientRect().top;
    return steps.map((s) => {
      const r = s.querySelector(".pipeline__node").getBoundingClientRect();
      return r.top - base + r.height / 2;
    });
  };
  const boxHalf = () => box.offsetHeight / 2;

  // Ajusta la línea (tenue + relleno) entre el primer y el último nodo
  const positionLine = () => {
    const c = centers();
    const top = c[0];
    track.style.top = top + "px";
    track.style.height = (c[c.length - 1] - top) + "px";
    fill.style.top = top + "px";
  };
  positionLine();

  const enhanced = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  if (!enhanced) {
    window.addEventListener("resize", positionLine);
    window.addEventListener("load", positionLine);
    return;
  }

  pipeline.classList.add("pipeline--animated");

  // Estado inicial
  gsap.set(steps, { opacity: 0, x: -16 });
  gsap.set(fill, { height: 0 });
  gsap.set(box, { xPercent: -50, y: () => centers()[0] - boxHalf() });

  // Timeline pausado: es una animación de ENTRADA, no ligada al scroll.
  // El primer paso aparece rápido; del segundo en adelante la caja baja lento.
  const tl = gsap.timeline({ paused: true });
  const GAP = 1.5; // ritmo lento para los pasos 2..n

  // Paso 1: la caja ya está en el primer nodo → solo revela el texto, rápido
  tl.to(steps[0], { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, 0);

  // Pasos siguientes: la caja baja nodo a nodo, lento y continuo
  steps.slice(1).forEach((step, idx) => {
    const i = idx + 1;
    const at = 0.3 + idx * GAP;
    tl.to(box, { y: () => centers()[i] - boxHalf(), duration: GAP, ease: "power1.inOut" }, at)
      .to(fill, { height: () => centers()[i] - centers()[0], duration: GAP, ease: "power1.inOut" }, at)
      // El texto arranca cuando la caja ya está aterrizando en el nodo
      .to(step, { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }, at + GAP * 0.7);
  });

  // Se reproduce UNA sola vez, a su propio ritmo, cuando la sección entra al
  // viewport. No depende del scroll ni se revierte al subir.
  let played = false;

  ScrollTrigger.create({
    trigger: pipeline,
    start: "top 78%",
    invalidateOnRefresh: true,
    onRefresh: () => {
      positionLine();
      tl.invalidate();
      tl.progress(tl.progress());
    },
    onEnter: () => {
      if (played) return;
      played = true;
      tl.play();
    }
  });
});

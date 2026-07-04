/**
 * Section reveals and timeline scrub
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return;

  // 1. Pain Cards Stagger Reveal (El Problema)
  gsap.to(".card--pain", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".problema__grid",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // 2. Vertical Timeline Progress Line Scrub
  gsap.to(".timeline__line-active", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline",
      start: "top 30%",
      end: "bottom 70%",
      scrub: 0.5
    }
  });

  // Timeline Steps reveals and active class toggles
  gsap.utils.toArray(".timeline__step").forEach((step) => {
    gsap.to(step, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step,
        start: "top 75%",
        end: "bottom 25%",
        toggleClass: { targets: step, className: "timeline__step--active" },
        toggleActions: "play none none reverse"
      }
    });
  });

  // 3. Qué Coordinamos Grid Stagger Reveal
  gsap.to(".card--service", {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".que-coordinamos__grid",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

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

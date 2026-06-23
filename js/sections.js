/**
 * Section reveals, timeline scrub, and counters
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if GSAP is available
  if (!window.gsap || !window.ScrollTrigger) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return; // Skip animations if user prefers reduced motion

  // 1. Pain Cards Stagger Reveal (El Problema)
  gsap.to(".card--pain", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2,
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

  // Timeline Steps reveals and class toggles
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

  // 3. Services Grid Stagger Reveal (Servicios)
  gsap.to(".card--service", {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".servicios__grid",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // 4. Diferenciadores Counters & Bars Reveal
  const initDiferenciadores = () => {
    // Animate decorative bars width (0% -> 100%)
    gsap.to(".diferenciadores__bar", {
      width: "100%",
      duration: 1.0,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Count animation for "30+ Años"
    const experienceNum = document.querySelector(".diferenciadores__num[data-val]");
    if (experienceNum) {
      const targetVal = parseInt(experienceNum.getAttribute("data-val"), 10);
      const countObj = { val: 0 };

      gsap.to(countObj, {
        val: targetVal,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          experienceNum.textContent = Math.floor(countObj.val) + "+";
        }
      });
    }
  };

  ScrollTrigger.create({
    trigger: ".diferenciadores",
    start: "top 75%",
    onEnter: initDiferenciadores,
    once: true // Only run once
  });

  // 5. Clientes Sectors Stagger Reveal
  gsap.to(".clientes__sector", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".clientes__grid",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });

  // Testimonial Fade-in
  gsap.to(".testimonial", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".testimonial",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});

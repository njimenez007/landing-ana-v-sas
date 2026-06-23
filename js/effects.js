/**
 * Interactive micro-animations: 3D Tilt Hover and Background Transitions
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 3D Tilt Hover Effect for Services Cards (Desktop Only)
  const tiltCards = document.querySelectorAll("[data-tilt]");
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (tiltCards.length > 0 && !isReducedMotion) {
    tiltCards.forEach(card => {
      // Ensure smooth reset when leaving
      card.style.transition = "transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out";
      card.style.willChange = "transform";

      card.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 1024) return; // Disable tilt on mobile/tablet

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // cursor X coordinate inside card
        const y = e.clientY - rect.top;  // cursor Y coordinate inside card

        // Calculate offset from the center of the card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;

        // Convert offset to rotation degrees (max tilt: 6 degrees)
        const maxTilt = 6;
        const rotateX = -(deltaY / centerY) * maxTilt;
        const rotateY = (deltaX / centerX) * maxTilt;

        // Apply rotation and scale
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        // Reset transform to initial state
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }

  // 2. Scroll-based Background Shift Transition (FR-19)
  // We can hook a transition when moving from Clientes (light background) to Footer (navy background)
  if (window.gsap && window.ScrollTrigger && !isReducedMotion) {
    // Transition footer content opacity/translation on entering footer
    gsap.from(".footer__main", {
      opacity: 0,
      y: 40,
      duration: 1.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".footer__info", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer__info",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }
});

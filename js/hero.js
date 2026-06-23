/**
 * Hero Section Animations & Header Scroll State
 * Updated according to hero-banner-spec.md
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if GSAP is available
  if (!window.gsap) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isReducedMotion) {
    // 1. Text Reveal of the H1 (clip-path inset animation)
    gsap.from('.hero-title__line', {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 0.85,
      stagger: 0.18,
      ease: 'power3.out',
      delay: 0.3
    });

    // 2. Fade-in of the subheadline
    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power2.out',
      delay: 0.9
    });

    // 3. Fade-in of the actions buttons
    gsap.from('.hero-actions', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power2.out',
      delay: 1.1
    });

    // 3. Parallax background for Hero
    gsap.to('.hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 4. Header Scrolled Class Toggle
  const header = document.getElementById("header");
  const handleHeaderScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  };

  // Run on load in case the page is already scrolled
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);

  // 5. CTA Sticky of WhatsApp entrance
  const ctaSticky = document.getElementById("sticky-cta");
  if (ctaSticky) {
    if (isReducedMotion) {
      ctaSticky.classList.add('is-visible');
    } else {
      setTimeout(() => {
        ctaSticky.classList.add('is-visible');
      }, 500);
    }
  }
});

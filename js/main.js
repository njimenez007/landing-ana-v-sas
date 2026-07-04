/**
 * Main JavaScript entry point - ANA V SAS Landing Page
 */

// Register ScrollTrigger plugin globally
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
} else {
  console.warn("GSAP or ScrollTrigger CDNs failed to load. Animations might not run.");
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".header__mobile-link");

  if (menuToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = menuToggle.classList.toggle("header__toggle--active");
      mobileMenu.classList.toggle("header__mobile-menu--open");
      document.body.classList.toggle("overflow-hidden");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    };

    menuToggle.addEventListener("click", toggleMenu);

    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("header__mobile-menu--open")) {
          toggleMenu();
        }
      });
    });
  }

  // Smooth scroll offsets for header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Let CSS handles basic smooth scroll, but if we want fine-tuned offsets:
        const headerHeight = document.getElementById("header").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

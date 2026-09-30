/**
 * Ny Asa-tanako – Scripts légers
 */

(function () {
  "use strict";

  // Header scroll state
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    // Close menu on link click
    nav.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNav, { passive: true });

  // Contact form (front-end only – simulation)
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simple validation
      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = "#c45c4a";
        } else {
          field.style.borderColor = "";
        }
      });

      if (!valid) return;

      // Simulate success
      form.reset();
      if (successMsg) {
        successMsg.hidden = false;
        setTimeout(() => {
          successMsg.hidden = true;
        }, 6000);
      }
    });
  }
})();

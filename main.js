// ===== js/main.js =====
// STACKLY Main JavaScript – GSAP animations, cursor, navigation

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Custom cursor
  const cursor = document.getElementById("cursor");
  const cursorFollower = document.getElementById("cursorFollower");

  if (window.matchMedia("(min-width: 992px)").matches) {
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    // Magnetic effect on buttons
    document
      .querySelectorAll(".btn, .game-card, .category-card, .news-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
          cursorFollower.style.background = "rgba(124,92,255,0.2)";
        });
        el.addEventListener("mouseleave", () => {
          cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
          cursorFollower.style.background = "transparent";
        });
      });
  } else {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
    document.body.style.cursor = "auto";
  }

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("active");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  function openMobileMenu() {
    mobileMenu.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    gsap.fromTo(
      mobileMenu,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4 },
    );
    gsap.fromTo(
      ".mobile-link",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 },
    );
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    gsap.to(mobileMenu, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        mobileMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      },
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hero animations
  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTimeline
    .fromTo(
      ".hero-title-line",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
    )
    .fromTo(
      ".hero-description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5",
    )
    .fromTo(
      ".hero-cta .btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2 },
      "-=0.4",
    )
    .fromTo(
      ".hero-stats .hero-stat",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      "-=0.3",
    )
    .fromTo(
      ".hero-visual",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1 },
      "-=0.8",
    );

  // Floating objects parallax
  document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
    gsap.to(".floating-obj", {
      x: moveX * (parseFloat(".floating-obj").getAttribute("data-speed") || 1),
      y: moveY * (parseFloat(".floating-obj").getAttribute("data-speed") || 1),
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Counter animation
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  statNumbers.forEach((num) => {
    const target = parseInt(num.getAttribute("data-count"));
    ScrollTrigger.create({
      trigger: num,
      start: "top 80%",
      onEnter: () => {
        gsap.to(num, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
        });
      },
      once: true,
    });
  });

  // Scroll animations for sections
  const animateSections = [
    ".featured-games-grid .game-card",
    ".why-card",
    ".news-card",
    ".event-card",
    ".review-card",
    ".community-image-card",
    ".category-card",
  ];

  animateSections.forEach((selector) => {
    gsap.fromTo(
      selector,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: selector,
          start: "top 85%",
        },
      },
    );
  });

  // Newsletter form animation
  // const newsletterForm = document.getElementById("newsletterForm");
  // if (newsletterForm) {
  //   newsletterForm.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     const input = newsletterForm.querySelector("input");
  //     if (input.value) {
  //       gsap.fromTo(
  //         newsletterForm,
  //         { scale: 1 },
  //         { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 },
  //       );
  //       input.value = "";
  //       // Success feedback
  //       const btn = newsletterForm.querySelector("button");
  //       btn.textContent = "Subscribed!";
  //       setTimeout(() => (btn.textContent = "Subscribe"), 2000);
  //     }
  //   });
  // }
});
// ===== js/games.js =====
// Games page filtering
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const gameCards = document.querySelectorAll(".game-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      gameCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.3 },
          );
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Page load animation
  gsap.fromTo(
    ".game-card",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, delay: 0.2 },
  );
});
// ===== js/contact.js =====
// Contact form validation and animation
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(".contact-form");
//   if (form) {
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const inputs = form.querySelectorAll("input, textarea");
//       let valid = true;
//       inputs.forEach((input) => {
//         if (!input.value.trim()) {
//           valid = false;
//           gsap.fromTo(
//             input,
//             { borderColor: "var(--pink)" },
//             { borderColor: "var(--pink)", duration: 0.3 },
//           );
//         } else {
//           input.style.borderColor = "var(--border)";
//         }
//       });
//       if (valid) {
//         const btn = form.querySelector("button");
//         btn.textContent = "Message Sent!";
//         gsap.to(btn, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
//         setTimeout(() => (btn.textContent = "Send Message"), 2000);
//         form.reset();
//       }
//     });
//   }
// });

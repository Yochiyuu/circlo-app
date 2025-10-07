document.addEventListener("DOMContentLoaded", () => {
  // === LOAD THEME FROM LOCALSTORAGE ===
  const savedTheme = localStorage.getItem("theme");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  // === ELEMENT SELECTORS ===
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;

  // === TOGGLE MOBILE MENU ===
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
      } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });
  }

  // === THEME TOGGLE (LIGHT / DARK MODE) ===
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLightMode = document.body.classList.contains("light-mode");

      if (isLightMode) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
      } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // === HANDLE NAV LINK CLICK ===
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Tutup menu saat link diklik (mobile)
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }

      const href = link.getAttribute("href");
      // Redirect manual kalau bukan anchor (#)
      if (href && href !== "#" && !href.startsWith("#")) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
});

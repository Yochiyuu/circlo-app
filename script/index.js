document.addEventListener("DOMContentLoaded", () => {
  // Load theme from localStorage on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const menuIcon = document.querySelector("#menu-btn i");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

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

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      if (isDarkMode) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Fix navigation: Allow redirect while toggling mobile menu
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
      const href = link.getAttribute("href");
      if (href && href !== "#" && !href.startsWith("#")) {
        e.preventDefault(); // Prevent default to handle manually
        window.location.href = href; // Force redirect
      }
    });
  });
});

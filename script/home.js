document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }

  // === Menu hamburger ===
  const hamburgerButton = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-nav");

  if (hamburgerButton && mobileMenu) {
    hamburgerButton.addEventListener("click", () => {
      hamburgerButton.classList.toggle("active");
      mobileMenu.classList.toggle("open");
    });
  }
});

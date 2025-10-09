document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  const hamburgerButton = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-nav");

  if (hamburgerButton && mobileMenu) {
    hamburgerButton.addEventListener("click", () => {
      hamburgerButton.classList.toggle("active");
      mobileMenu.classList.toggle("open");
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Load theme from localStorage on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "home.html";
    });
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    const body = document.body;

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDarkMode = body.classList.contains("dark-mode");
      icon.classList.toggle("fa-sun", isDarkMode);
      icon.classList.toggle("fa-moon", !isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
  }
});

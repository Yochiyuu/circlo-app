document.addEventListener("DOMContentLoaded", () => {
    // Fungsionalitas Theme Toggle
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
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

    // Fungsionalitas Form Sign-up
    const signUpForm = document.getElementById("signUpForm");
    const passwordInput = document.getElementById("password");
    const konfirmasiPasswordInput = document.getElementById("konfirmasiPassword");
    const warningText = document.getElementById("warning");

    if (signUpForm) {
        signUpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Validasi konfirmasi password
            if (passwordInput.value !== konfirmasiPasswordInput.value) {
                warningText.textContent = "Password dan Konfirmasi Password tidak cocok.";
                warningText.style.display = "block";
                return;
            }

            warningText.style.display = "none";
            
            // Redirect ke halaman Syarat & Ketentuan setelah validasi berhasil
            window.location.href = "snk.html";
        });
    }
});
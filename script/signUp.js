document.addEventListener('DOMContentLoaded', () => {
    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const form = document.getElementById('signUpForm');
    const password = document.getElementById('password');
    const konfirmasiPassword = document.getElementById('konfirmasiPassword');
    const warning = document.getElementById('warning');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (password.value !== konfirmasiPassword.value) {
                warning.textContent = "Konfirmasi password tidak cocok";
                warning.style.display = 'block';
                return;
            }

            window.location.href = "home.html";
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            icon.classList.toggle('fa-sun', isDarkMode);
            icon.classList.toggle('fa-moon', !isDarkMode);
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
});
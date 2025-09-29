document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signUpForm')
    const password = document.getElementById('password');
    const konfirmasiPassword = document.getElementById('konfirmasiPassword');
    const warning = document.getElementById('warning');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (password.value !== konfirmasiPassword.value) {
            warning.textContent = "Konfirmasi password tidak cocok";
            warning.style.display = 'block';
            return;
        }

        window.location.href = "home.html"
    });
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        icon.classList.toggle('fa-sun', body.classList.contains('dark-mode'));
        icon.classList.toggle('fa-moon', !body.classList.contains('dark-mode'));
    });
  }
});
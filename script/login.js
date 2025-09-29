document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      window.location.href = 'home.html';
    });
  }

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

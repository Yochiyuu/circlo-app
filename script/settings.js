document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            document.body.classList.remove('light-mode', 'dark-mode');
            document.body.classList.add(`${e.target.value}-mode`);
        });
    }

    const saveButton = document.querySelector('.btn-save');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const bio = document.getElementById('bio').value;
            alert(`Profile saved!\nUsername: ${username}\nBio: ${bio}`);
        });
    }

    const changePasswordButton = document.querySelector('.btn-change-password');
    if (changePasswordButton) {
        changePasswordButton.addEventListener('click', () => {
            alert('Change password functionality to be implemented.');
        });
    }

    const deactivateButton = document.querySelector('.btn-deactivate');
    if (deactivateButton) {
        deactivateButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to deactivate your account?')) {
                alert('Account deactivation requested.');
            }
        });
    }

    // Ensure navigation links work by removing any conflicting event listeners
    document.querySelectorAll('.nav-links a, .navigation-card a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for specific cases if needed, otherwise allow normal navigation
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href; // Force redirect
            }
        });
    });
});
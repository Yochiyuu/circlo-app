document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            document.body.classList.remove('light-mode', 'dark-mode');
            document.body.classList.add(`${e.target.value}-mode`);
            localStorage.setItem("theme", e.target.value);
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

    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.disabled = false;
        toggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            console.log(`${e.target.id} toggled to ${isChecked}`);
            localStorage.setItem(e.target.id, isChecked);
        });
    });

    toggleSwitches.forEach(toggle => {
        const savedState = localStorage.getItem(toggle.id);
        if (savedState === 'true') {
            toggle.checked = true;
        }
    });
});
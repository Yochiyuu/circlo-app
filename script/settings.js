document.addEventListener('DOMContentLoaded', () => {
    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
        // Set initial value based on saved theme
        if (savedTheme === 'dark') {
            themeSelect.value = 'dark';
        } else {
            themeSelect.value = 'light';
        }

        themeSelect.addEventListener('change', (e) => {
            document.body.classList.remove('light-mode', 'dark-mode');
            const selectedTheme = e.target.value;
            document.body.classList.add(`${selectedTheme}-mode`);
            localStorage.setItem('theme', selectedTheme);
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

    // Enable and manage toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.disabled = false; // Ensure checkboxes are not disabled
        toggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            console.log(`${e.target.id} toggled to ${isChecked}`);
            localStorage.setItem(e.target.id, isChecked);
            // Update UI or perform other actions based on toggle state if needed
        });
    });

    // Initialize toggle states from localStorage
    toggleSwitches.forEach(toggle => {
        const savedState = localStorage.getItem(toggle.id);
        if (savedState === 'true') {
            toggle.checked = true;
        }
    });
});
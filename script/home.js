document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-nav');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            hamburgerButton.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }
});
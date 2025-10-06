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

    // Logika Syarat & Ketentuan dan Animasi Scroll
    const termsContent = document.getElementById("terms-content");
    const agreeBtn = document.getElementById("agree-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    
    // IntersectionObserver for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: termsContent, threshold: 0.1 }); // Observe inside the terms-content div

    // Select all elements to be animated
    const elementsToAnimate = termsContent.querySelectorAll('h3, p, ul, li');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });

    if (termsContent && agreeBtn && cancelBtn) {
        // Aktifkan tombol "Agree" saat pengguna menggulir hingga bawah
        termsContent.addEventListener("scroll", () => {
            if (termsContent.scrollHeight - termsContent.scrollTop <= termsContent.clientHeight + 1) {
                agreeBtn.disabled = false;
            }
        });

        // Redirect ke home.html saat tombol "Agree" diklik
        agreeBtn.addEventListener("click", () => {
            window.location.href = "home.html";
        });

        // Redirect kembali ke sign-up.html saat tombol "Cancel" diklik
        cancelBtn.addEventListener("click", () => {
            window.location.href = "sign-up.html";
        });
    }
});
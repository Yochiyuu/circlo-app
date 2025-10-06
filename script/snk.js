document.addEventListener("DOMContentLoaded", () => {
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

    const termsContent = document.getElementById("terms-content");
    const agreeBtn = document.getElementById("agree-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    if (termsContent && agreeBtn && cancelBtn) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
            observer.observe(el);
        });

        termsContent.addEventListener("scroll", () => {
            if (termsContent.scrollHeight - termsContent.scrollTop <= termsContent.clientHeight + 1) {
                agreeBtn.disabled = false;
            }
        });

        agreeBtn.addEventListener("click", () => {
            window.location.href = "home.html";
        });

        cancelBtn.addEventListener("click", () => {
            window.location.href = "sign-up.html";
        });
    }
});
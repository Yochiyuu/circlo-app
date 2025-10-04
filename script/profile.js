document.querySelectorAll(".post-actions i").forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.classList.contains("fa-heart")) {
      icon.classList.toggle("liked");
      icon.classList.toggle("far");
      icon.classList.toggle("fas");
      if (icon.classList.contains("liked")) {
        const burst = document.createElement("span");
        burst.classList.add("heart-burst");
        burst.innerHTML = "❤️";
        const parent = icon.parentElement;
        parent.appendChild(burst);
        setTimeout(() => {
          burst.remove();
        }, 600);
      }
    }
    if (icon.classList.contains("fa-bookmark")) {
      icon.classList.toggle("bookmarked");
      icon.classList.toggle("far");
      icon.classList.toggle("fas");
    }
  });
});

// Load theme from localStorage on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  if (isDarkMode) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

document.querySelectorAll(".post-images.slider").forEach((slider) => {
  const slides = slider.querySelector(".slides");
  const images = slider.querySelectorAll("img");
  let index = 0;

  slider.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
  });

  slider.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-menu");
  const icon = document.querySelector(".hamburger-icon");
  const mobileMenu = document.querySelector(".mobile-menu-overlay");

  // Klik hamburger → buka/tutup menu
  hamburger.addEventListener("click", () => {
    icon.classList.toggle("open");
    mobileMenu.classList.toggle("active");
  });

  // Klik di luar menu → tutup menu (hanya di mobile)
  window.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      icon.classList.remove("open");
      mobileMenu.classList.remove("active");
    }
  });
});

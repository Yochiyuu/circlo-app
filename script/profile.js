document.querySelectorAll('.post-actions i').forEach(icon => {
  icon.addEventListener('click', () => {
    if (icon.classList.contains('fa-heart')) {
      icon.classList.toggle('liked');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      if (icon.classList.contains('liked')) {
        const burst = document.createElement('span');
        burst.classList.add('heart-burst');
        burst.innerHTML = '❤️';
        const parent = icon.parentElement;
        parent.appendChild(burst);
        setTimeout(() => { burst.remove(); }, 600);
      }
    }
    if (icon.classList.contains('fa-bookmark')) {
      icon.classList.toggle('bookmarked');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
    }
  });
});

// Load theme from localStorage on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  if (isDarkMode) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

document.querySelectorAll('.post-images.slider').forEach(slider => {
  const slides = slider.querySelector('.slides');
  const images = slider.querySelectorAll('img');
  let index = 0;

  slider.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % images.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
  });

  slider.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
  });
});
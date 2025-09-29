const buttons = document.querySelectorAll('.menu-btn');
    const sections = document.querySelectorAll('.content-container > div');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sections.forEach(sec => sec.classList.add('hidden'));
        document.getElementById(btn.dataset.target).classList.remove('hidden');
      });
    });
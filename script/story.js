document.addEventListener("DOMContentLoaded", () => {
  const allStoriesData = [
    {
      user: "@republikindonesia",
      profilePic: "assets/img/story/IndonesiaFlag.jpg",
      storyContent: "assets/img/story/republikIndonesia.png",
      type: "image",
    },
    {
      user: "@livyrenata",
      profilePic: "assets/img/home/livyRenata.png",
      storyContent: "assets/video/livyPost.mp4",
      type: "video",
    },
    {
      user: "@bradpitt",
      profilePic: "https://hips.hearstapps.com/hmg-prod/images/actor-brad-pitt-attends-the-photocall-of-the-movie-wolfs-news-photo-1726680022.jpg?crop=0.670xw:1.00xh;0.0760xw,0&resize=640:*",
      storyContent: "https://www.mnctrijaya.com/uploads/news/d717b62f-7e2e-469f-a662-2cb5e30b1371.jpg",
      type: "image",
    },
    {
      user: "@jvke",
      profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsID3K344ZfK_PJDnIB4f-GLP3mfD00_tIgw&s",
      storyContent: "http://i.scdn.co/image/ab67616d0000b273a0934c15232680a3afc9da6e",
      type: "image",
    },
  ];

  const container = document.querySelector(".story-carousel-container");
  const wrapper = document.querySelector(".story-wrapper");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const exitBtn = document.querySelector(".exit-button");

  const volumeOnIcon = `<svg viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77M16.5 12c0-1.77-1-3.29-2.5-4.03v8.05c1.5-0.74 2.5-2.26 2.5-4.02M3 9v6h4l5 5V4L7 9H3z"/></svg>`;
  const volumeOffIcon = `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63m2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3M12 4L9.91 6.09 12 8.18V4z"/></svg>`;

  let currentIndex = 0;
  let items = [];

  function renderStories() {
    wrapper.innerHTML = "";
    allStoriesData.forEach((story, index) => {
      const storyItem = document.createElement("div");
      storyItem.classList.add("story-item");
      storyItem.setAttribute("data-index", index);

      let mediaElement,
        volumeControl = "";
      if (story.type === "video") {
        mediaElement = `<video class="story-content-media" src="${story.storyContent}" loop playsinline></video>`;
        volumeControl = `<div class="volume-control" data-muted="true">${volumeOffIcon}</div>`;
      } else {
        mediaElement = `<img class="story-content-media" src="${story.storyContent}" alt="Story from ${story.user}">`;
      }

      storyItem.innerHTML = `
                        <div class="story-item-header">
                            <img src="${story.profilePic}" alt="${story.user}" class="profile-pic">
                            <span class="username">${story.user}</span>
                        </div>
                        ${mediaElement}
                        ${volumeControl}
                    `;
      wrapper.appendChild(storyItem);
    });
    items = document.querySelectorAll(".story-item");
  }

  function goToStory(index) {
    if (index < 0 || index >= items.length) return;

    const oldVideo = items[currentIndex].querySelector("video");
    if (oldVideo) oldVideo.muted = true;

    currentIndex = index;

    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
      const video = item.querySelector("video");
      if (video) {
        if (i === index) {
          video.play().catch((e) => console.error("Autoplay ditolak:", e));
          const volControl = item.querySelector(".volume-control");
          video.muted = volControl.dataset.muted === "true";
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    const activeItem = items[index];
    const containerCenter = container.offsetWidth / 2;
    const itemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
    const offset = containerCenter - itemCenter;
    wrapper.style.transform = `translateX(${offset}px)`;

    prevBtn.classList.toggle("hidden", index === 0);
    nextBtn.classList.toggle("hidden", index === items.length - 1);
  }

  exitBtn.addEventListener("click", () => {
    window.history.back(); 
  });

  container.addEventListener("click", (e) => {
    const volControl = e.target.closest(".volume-control");
    if (volControl) {
      const video = volControl.closest(".story-item").querySelector("video");
      if (video) {
        video.muted = !video.muted;
        volControl.dataset.muted = video.muted;
        volControl.innerHTML = video.muted ? volumeOffIcon : volumeOnIcon;
      }
    } else {
      const clickedItem = e.target.closest(".story-item");
      if (clickedItem) {
        const clickedIndex = parseInt(clickedItem.getAttribute("data-index"));
        if (clickedIndex !== currentIndex) goToStory(clickedIndex);
      }
    }
  });

  nextBtn.addEventListener("click", () => goToStory(currentIndex + 1));
  prevBtn.addEventListener("click", () => goToStory(currentIndex - 1));

  renderStories();
  goToStory(0);
  window.addEventListener("resize", () => goToStory(currentIndex));
});
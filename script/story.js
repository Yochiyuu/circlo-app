document.addEventListener("DOMContentLoaded", () => {
    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

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

    const volumeOnIcon = `<svg viewBox="0 0 24 24"><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77M16.5 12c0-1.77-1-3.29-2.5-4.03v8.05c1.5-0.74 2.5-2.26 2.5-4.02M2.53 19.23l1.5-1.5c.18-.18.33-.4.43-.64.1-.24.15-.5.15-.77v-5.06c0-.27-.05-.53-.15-.77s-.25-.46-.43-.64l-1.5-1.5c-.4-.4-1.05-.4-1.45 0l-1.5 1.5c-.4.4-.4 1.05 0 1.45l4.95 4.95c.4.4 1.05.4 1.45 0M3.24 10.5l1.5-1.5c.18-.18.33-.4.43-.64.1-.24.15-.5.15-.77v-5.06c0-.27-.05-.53-.15-.77s-.25-.46-.43-.64l-1.5-1.5c-.4-.4-1.05-.4-1.45 0l-1.5 1.5c-.4.4-.4 1.05 0 1.45l4.95 4.95c.4.4 1.05.4 1.45 0M12 2v20c-5.52 0-10-4.48-10-10s4.48-10 10-10z"/></svg>`;
    const volumeOffIcon = `<svg viewBox="0 0 24 24"><path d="M12 2v20c-5.52 0-10-4.48-10-10s4.48-10 10-10zM13 17h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;

    let currentIndex = 0;

    function renderStories() {
        container.innerHTML = "";
        allStoriesData.forEach((story, index) => {
            const storyItem = document.createElement("div");
            storyItem.classList.add("story-item");
            storyItem.setAttribute("data-index", index);
            storyItem.innerHTML = `
                <div class="story-circle">
                    <img src="${story.profilePic}" alt="${story.user}" />
                    <span class="story-ring"></span>
                </div>
                <span class="story-username">${story.user}</span>
            `;
            container.appendChild(storyItem);
        });

        // Add event listeners to story items
        container.querySelectorAll(".story-item").forEach((item, index) => {
            item.addEventListener("click", () => {
                goToStory(index);
            });
        });
    }

    function goToStory(index) {
        if (index < 0) index = 0;
        if (index >= allStoriesData.length) index = 0;

        currentIndex = index;
        const story = allStoriesData[index];

        wrapper.innerHTML = `
            <div class="story-content">
                <div class="story-header">
                    <div class="story-user-info">
                        <img src="${story.profilePic}" alt="${story.user}" />
                        <div>
                            <h3>${story.user}</h3>
                            <p>1h ago</p>
                        </div>
                    </div>
                    <div class="story-actions">
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                <div class="story-media">
                    ${story.type === "video" ? `<video src="${story.storyContent}" muted loop autoplay playsinline></video>` : `<img src="${story.storyContent}" alt="Story" />`}
                    <div class="volume-control" data-muted="true">${volumeOffIcon}</div>
                </div>
                <div class="story-footer">
                    <div class="story-progress">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="story-options">
                        <i class="fas fa-reply"></i>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>
            <button class="exit-button">
                <i class="fas fa-times"></i>
            </button>
        `;

        const video = wrapper.querySelector("video");
        if (video) {
            video.addEventListener("ended", () => {
                goToStory((currentIndex + 1) % allStoriesData.length);
            });
        }

        const volControl = wrapper.querySelector(".volume-control");
        if (volControl) {
            volControl.addEventListener("click", (e) => {
                e.stopPropagation();
                const isMuted = volControl.dataset.muted === "true";
                if (video) {
                    video.muted = !isMuted;
                    volControl.dataset.muted = (!isMuted).toString();
                    volControl.innerHTML = isMuted ? volumeOnIcon : volumeOffIcon;
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }

        const activeItem = items[index];
        const containerCenter = container.offsetWidth / 2;
        const itemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
        const offset = containerCenter - itemCenter;
        wrapper.style.transform = `translateX(${offset}px)`;

        prevBtn.classList.toggle("hidden", index === 0);
        nextBtn.classList.toggle("hidden", index === allStoriesData.length - 1);
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
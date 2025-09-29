document.addEventListener('DOMContentLoaded', () => {
    const postsTab = document.getElementById('posts-tab');
    const favoritesTab = document.getElementById('favorites-tab');
    const taggedTab = document.getElementById('tagged-tab');

    const postsContent = document.getElementById('posts-content');
    const favoritesContent = document.getElementById('favorites-content');
    const taggedContent = document.getElementById('tagged-content');

    const tabs = [postsTab, favoritesTab, taggedTab];
    const contents = [postsContent, favoritesContent, taggedContent];

    function switchTab(clickedTab, contentToShow) {
        tabs.forEach(tab => {
            if (tab) tab.classList.remove('active');
        });
        contents.forEach(content => {
            if (content) content.classList.add('hidden');
        });

        if (clickedTab) clickedTab.classList.add('active');
        if (contentToShow) contentToShow.classList.remove('hidden');
    }

    if (postsTab) {
        postsTab.addEventListener('click', (event) => {
            event.preventDefault();
            switchTab(postsTab, postsContent);
        });
    }

    if (favoritesTab) {
        favoritesTab.addEventListener('click', (event) => {
            event.preventDefault();
            switchTab(favoritesTab, favoritesContent);
        });
    }

    if (taggedTab) {
        taggedTab.addEventListener('click', (event) => {
            event.preventDefault();
            switchTab(taggedTab, taggedContent);
        });
    }
});
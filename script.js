document.addEventListener('DOMContentLoaded', function() {
    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            const videoGrid = document.getElementById('videoGrid');

            data.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');
                videoCard.setAttribute('data-tags', video.tags.join(', '));

                videoCard.innerHTML = `
                    <a href="video.html?video=${video.id}">
                        <img src="${video.thumbnail}" class="thumbnail" alt="Video Thumbnail">
                        <div class="video-info">
                            <h2 class="video-title">${video.title}</h2>
                            <p class="video-description">${video.description}</p>
                        </div>
                    </a>
                `;

                videoGrid.appendChild(videoCard);
            });
        })
        .catch(error => console.error('Error fetching video data:', error));
});

function openDrawer() {
    document.getElementById("drawer").style.width = "250px";
    document.getElementById("overlay").style.display = "block";
}

function closeDrawer() {
    document.getElementById("drawer").style.width = "0";
    document.getElementById("overlay").style.display = "none";
}

function filterVideos() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        const title = card.querySelector('.video-title').textContent.toLowerCase();
        const description = card.querySelector('.video-description').textContent.toLowerCase();
        
        if (title.includes(input) || description.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByTag(tag) {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const tags = card.getAttribute('data-tags').toLowerCase();
        
        if (tag === 'Show All Tags' || tags.includes(tag.toLowerCase())) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            const videoGrid = document.getElementById('videoGrid');

            data.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');
                videoCard.setAttribute('data-tags', video.tags.join(', '));

                videoCard.innerHTML = `
                    <a href="video.html?video=${video.id}">
                        <img src="${video.thumbnail}" class="thumbnail" alt="Video Thumbnail">
                        <div class="video-info">
                            <h2 class="video-title">${video.title}</h2>
                            <p class="video-description">${video.description}</p>
                        </div>
                    </a>
                `;

                videoGrid.appendChild(videoCard);
            });
        })
        .catch(error => console.error('Error fetching video data:', error));
});

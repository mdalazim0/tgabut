// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0lu6gt-KpRgeBa8PgAsSJU_nkp5Ap-io",
    authDomain: "video-9c20a.firebaseapp.com",
    databaseURL: "https://video-9c20a-default-rtdb.firebaseio.com",
    projectId: "video-9c20a",
    storageBucket: "video-9c20a.appspot.com",
    messagingSenderId: "171571734218",
    appId: "1:171571734218:web:25af552361037d72897633"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const videosRef = db.ref('videos'); // Reference to the videos node

// Function to shuffle videos array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Load random videos on homepage
function loadHomePageVideos() {
    const videoGrid = document.getElementById('videoGrid');

    // Fetch all videos from Firebase
    db.ref('videos').once('value').then(snapshot => {
        const videos = [];
        snapshot.forEach(childSnapshot => {
            videos.push(childSnapshot.val());
        });

        // Shuffle videos array to get random videos
        const randomVideos = shuffleArray(videos).slice(0, 6);  // Limit to 6 random videos

        // Display the videos in the grid
        randomVideos.forEach(video => {
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
    }).catch(error => {
        console.error('Error fetching videos:', error);
    });
}

// Load random suggested videos on video page
function loadSuggestedVideos() {
    const suggestedVideosGrid = document.getElementById('suggestedVideos');

    // Fetch all videos from Firebase
    db.ref('videos').once('value').then(snapshot => {
        const videos = [];
        snapshot.forEach(childSnapshot => {
            videos.push(childSnapshot.val());
        });

        // Shuffle videos array to get random suggestions
        const randomSuggestedVideos = shuffleArray(videos).slice(0, 4);  // Show 4 suggestions

        // Display the suggested videos
        randomSuggestedVideos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');

            videoCard.innerHTML = `
                <a href="video.html?video=${video.id}">
                    <img src="${video.thumbnail}" class="thumbnail" alt="Video Thumbnail">
                    <div class="video-info">
                        <h2 class="video-title">${video.title}</h2>
                        <p class="video-description">${video.description}</p>
                    </div>
                </a>
            `;
            suggestedVideosGrid.appendChild(videoCard);
        });
    }).catch(error => {
        console.error('Error fetching suggested videos:', error);
    });
}

// Load video on video.html page
function loadVideoPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('video');

    if (videoId) {
        const iframe = document.getElementById('videoIframe');
        iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
    }

    // Load suggested videos below the player
    loadSuggestedVideos();
}

// Search videos by title or description
function searchFunction() {
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

// Drawer menu functionality
function openDrawer() {
    document.getElementById("drawer").style.width = "250px";
    document.getElementById("overlay").style.display = "block";
}

function closeDrawer() {
    document.getElementById("drawer").style.width = "0";
    document.getElementById("overlay").style.display = "none";
}

// Initialize the correct page functions
document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname;

    if (page.includes('index.html')) {
        loadHomePageVideos();  // Load random videos on homepage
    } else if (page.includes('video.html')) {
        loadVideoPlayer();  // Load specific video and suggested videos
    }
});

// Add video to Firebase
document.getElementById('videoForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const videoId = document.getElementById('videoId').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const adminPassword = document.getElementById('adminPassword').value;

    // Check the password
    if (adminPassword !== "Azim900@#") {
        alert("Incorrect password! Video not added.");
        return; // Exit the function if password is incorrect
    }

    const newVideoRef = videosRef.push();
    newVideoRef.set({
        id: videoId,
        title: title,
        description: description,
        thumbnail: thumbnail,
        tags: tags
    })
    .then(() => {
        alert("Video added successfully!");
        document.getElementById('videoForm').reset(); // Clear the form
    })
    .catch(error => {
        console.error('Error adding video:', error);
        alert("Failed to add video. Please try again.");
    });
});
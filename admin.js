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
const videosRef = db.ref('videos');

// Add video to Firebase
document.getElementById('videoForm').addEventListener('submit', function(e) {
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

// Load and display all videos
function loadVideos() {
    videosRef.on('value', function(snapshot) {
        const videoList = document.getElementById('videoList');
        videoList.innerHTML = ''; // Clear the list
        let count = 0;

        snapshot.forEach(function(childSnapshot) {
            const video = childSnapshot.val();
            count++;

            // Create a list item for each video
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${video.title}</strong> (${video.id})<br>
                    <span class="tags-list">Tags: ${video.tags.join(', ')}</span>
                </div>
                <button onclick="deleteVideo('${childSnapshot.key}')">Delete</button>
            `;
            videoList.appendChild(li);
        });

        document.getElementById('totalVideos').textContent = count;
    });
}

// Delete video from Firebase
function deleteVideo(videoKey) {
    if (confirm('Are you sure you want to delete this video?')) {
        videosRef.child(videoKey).remove();
    }
}

// Load videos on page load
window.onload = loadVideos;
const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");

const handlePlayClick = () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
};

const handleVolumeClick = () => {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        videoPlayer.muted = true;
        volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
};

const goFullScreen = () => {
    videoContainer.webkitRequestFullscreen();
    fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenButton.removeEventListener("click", goFullScreen);
    fullScreenButton.addEventListener("click", exitFullScreen);
};

const exitFullScreen = () => {
    document.exitFullscreen();
    fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenButton.addEventListener("click", goFullScreen);
};

const init = () => {
    playButton.addEventListener("click", handlePlayClick);
    volumeButton.addEventListener("click", handleVolumeClick);
    fullScreenButton.addEventListener("click", goFullScreen);
};

if (videoContainer) {
    init();
}

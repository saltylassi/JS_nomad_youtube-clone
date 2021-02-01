const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

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
    fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenButton.removeEventListener("click", goFullScreen);
    fullScreenButton.addEventListener("click", exitFullScreen);
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
};

const exitFullScreen = () => {
    fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenButton.addEventListener("click", goFullScreen);
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

const formatDate = (time) => {
    const secondsNumber = parseInt(time, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let seconds = secondsNumber - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
};

const getCurrentTime = () => {
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
};

const setTotalTime = () => {
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
};

const init = () => {
    playButton.addEventListener("click", handlePlayClick);
    volumeButton.addEventListener("click", handleVolumeClick);
    fullScreenButton.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime); //로딩
};

if (videoContainer) {
    init();
}

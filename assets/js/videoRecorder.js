const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObj;
let videoRecorder;
const handleVideoData = (event) => {
    const { data: videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile); //URL을 얻어와서 연결
    link.download = "recorded.webm";
    document.body.appendChild(link); //컴포넌트 추가
    link.click();
};

const startRecording = () => {
    console.log(typeof stream);
    videoRecorder = new MediaRecorder(streamObj);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.removeEventListener("click", startRecording);
    recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "start Recording";
};

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 },
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop";
        streamObj = stream;
        startRecording();
    } catch (error) {
        recordBtn.innerHTML = "device not found";
    } finally {
        recordBtn.removeEventListener("click", getVideo);
    }
};

const init = () => {
    recordBtn.addEventListener("click", getVideo);
};

if (recorderContainer) {
    init();
}

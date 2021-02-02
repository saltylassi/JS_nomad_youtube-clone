import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
let commentList = document.querySelector(".video__comments-list");
let views = document.querySelector(".video__comment-number");
let commentData;
//추후 deleteComment도 만들어야함
//api작성, 분리

const addDummy = (text) => {
    const li = document.createElement("li");
    const comment = document.createElement("span");
    comment.innerHTML = text;
    li.appendChild(comment);
    commentList.prepend(li);
    // views.innerHTML = views.innerHTML + 1; -> String취급

    views.innerHTML = parseInt(views.innerHTML) + 1 + " comments";
};

const sendComment = async (text) => {
    console.log(text);
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment/add`,
        method: "POST",
        data: {
            comment: text,
        },
    });
    console.log(response.data);
    commentData = response.data;
    if (response.status == 200) {
        addDummy(text);
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    const commentTextArea = addCommentForm.querySelector("input");
    const comment = commentTextArea.value;
    sendComment(comment);
    commentTextArea.value = "";
};

const init = () => {
    addCommentForm.addEventListener("submit", handleSubmit);
};

if (addCommentForm) {
    init();
}

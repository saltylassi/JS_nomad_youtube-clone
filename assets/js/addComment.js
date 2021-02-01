import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
let commentList = document.querySelector(".video__comments-list");
let views = document.querySelector(".video__comment-number");

const temp = (text) => {
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
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment: text,
        },
    });
    console.log(response);
    if (response.status == 200) {
        temp(text);
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

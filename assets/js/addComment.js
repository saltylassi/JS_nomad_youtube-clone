import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
let commentList = document.querySelector(".video__comments-list");
let views = document.querySelector(".video__comment-number");
let commentData;
//추후 deleteComment도 만들어야함
//api작성, 분리

const addDummy = (name, commentText) => {
    const li = document.createElement("li");
    li.className = "video__comment";

    const content = document.createElement("div");
    content.className = "comment__content";

    const textBox = document.createElement("div");
    textBox.className = "video__comment__text-box";

    const comment = document.createElement("span");
    comment.className = "video__comment__text";

    const time = document.createElement("div");
    time.className = "video__comment__time";

    const timeText = document.createElement("span");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete__comment-btn";

    const btnText = document.createElement("span");

    const user = document.createElement("div");
    user.className = "video__comment__creator";

    const userName = document.createElement("span");

    li.appendChild(content);
    li.appendChild(user);

    content.appendChild(textBox);
    content.appendChild(time);
    content.appendChild(deleteBtn);

    textBox.appendChild(comment);

    time.appendChild(timeText);

    deleteBtn.appendChild(btnText);

    user.appendChild(userName);

    userName.innerText = name;
    comment.innerText = commentText;
    btnText.innerText = "X";
    timeText.innerText = String(new Date()).split("GMT")[0];

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

    const {
        data: {
            creator: { name },
            text: comment,
        },
    } = response;

    console.log(response.data);
    commentData = response.data;
    if (response.status == 200) {
        addDummy(name, comment);
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

import axios from "axios";

let commentList = document.querySelector(".video__comments-list");
let views = document.querySelector(".video__comment-number");
let deleteButton = document.querySelector(".delete__comment-btn");

const deleteDummy = (text) => {
    const li = document.createElement("li");
    const nameDiv = document.createElement("div");
    const name = document.createElement("span");

    comment.innerHTML = text;
    li.appendChild(comment);
    commentList.prepend(li);
    // views.innerHTML = views.innerHTML + 1; -> String취급

    views.innerHTML = parseInt(views.innerHTML) + 1 + " comments";
};

const getComment = async (targetList) => {
    const videoId = window.location.href.split("/videos/")[1];
    const userName = targetList.querySelector(".video__comment__creator span").innerHTML;
    const text = targetList.querySelector(".video__comment__text-box span").innerHTML;
    const date = new Date(targetList.querySelector(".video__comment__time span").innerHTML);

    const response = await axios({
        url: `/api/${videoId}/comment/delete`,
        method: "POST",
        data: {
            name: userName,
            date,
            text,
        },
    });
    console.log(response);
    // if (response.status == 200) {
    //     deleteDummy(text);
    // }
};

const handleDelete = (event) => {
    event.preventDefault();
    let target = event.target.parentNode.parentNode.parentNode;
    getComment(target);
};

const init = () => {
    deleteButton.addEventListener("click", handleDelete);
};

if (commentList) {
    init();
}

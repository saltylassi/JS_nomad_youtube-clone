import axios from "axios";

let commentList = document.querySelector(".video__comments-list");
let views = document.querySelector(".video__comment-number");
let deleteButtons = commentList.querySelectorAll(".delete__comment-btn");

const fakeDelete = (targetList) => {
    commentList.removeChild(targetList);

    // views.innerHTML = views.innerHTML + 1; -> String취급

    views.innerHTML = parseInt(views.innerHTML) + -1 + " comments";
};

const getComment = async (targetList) => {
    const videoId = window.location.href.split("/videos/")[1];

    const response = await axios({
        url: `/api/${videoId}/comment/delete`,
        method: "POST",
        data: {
            id: targetList.id,
        },
    });
    console.log(response);
    if (response.status == 200) {
        fakeDelete(targetList);
    }
};

const handleDelete = (event) => {
    event.preventDefault();
    let target = event.target.parentNode.parentNode.parentNode;
    // console.log(target.id);
    getComment(target);
};

const init = () => {
    // console.log(commentList.childNodes[1].querySelector(".delete__comment-btn"));

    // commentList.childNodes.map((item) => {
    //     deleteButton.push(item.querySelector(".delete__comment-btn"));
    // });

    // deleteButtons.map((btn) => {
    //     btn.classList.add("dd");
    //     btn.addEventListener("click", handleDelete);
    // });

    // deleteButtons.addEventListener("click", handleDelete);
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", handleDelete);
    }

    //나중에 할 때는 버튼을 컴포넌트화 시킬 것
    //사후처리는 지저분해질 수 밖에 없음
};

if (deleteButtons !== []) {
    init();
}

import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 }); //조건X -> 전부 로드
        res.render("home", { pageTitle: "home", videos }); //render는 서버의 pug파일을 출력, views폴더에서 동일한 이름을 가진 파일을 찾는다
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "home", videos: [] });
    }
};

export const search = async (req, res) => {
    const {
        query: { term: searchingBy },
    } = req; //ES6, destructuring

    let videos = [];

    try {
        videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } });
    } catch (error) {
        console.log(error);
    }

    res.render("search", { pageTitle: "search", searchingBy, videos }); //searchingBy는 searchingBy:searchingBy와 동일 (ES6)
};

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "upload" });
};

export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path },
        user,
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title: title,
        description: description,
        creator: user.id,
    });

    user.videos.push(newVideo.id);
    user.save();

    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id },
    } = req;

    try {
        const video = await Video.findById(id)
            .populate("creator")
            .populate({
                path: "comments",
                model: "Comment",
                populate: {
                    path: "creator",
                    model: "User",
                },
            }); //populate는 objID에 사용, id로 해당 객체를 참조
        // console.log(video.comments);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id },
    } = req;

    try {
        const video = await Video.findById(id).populate("creator");
        if (video.creator.id != req.user.id) {
            throw Error();
        } else {
            res.render("editVideo", { pageTitle: "Edit Video", video });
        }
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description },
    } = req;

    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        console.log(error);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id },
    } = req;

    try {
        const video = await Video.findById(id).populate("creator");
        if (video.creator.id !== req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove(id);
        }
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect(routes.home);
    }
};

export const postRegisterView = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        video.views++;
        video.save();
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        console.log("done");
        res.end();
    }
};

export const postAddComment = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        const newComment = await Comment.create({
            text: req.body.comment,
            creator: req.user.id,
        });
        const creator = await User.findById(req.user.id);

        res.json({ creator: creator, text: newComment.text, createdAt: newComment.createdAt });
        video.comments.unshift(newComment.id);
        video.save();
    } catch (error) {
        res.status(400);
        console.log(error);
    } finally {
        res.end();
    }
};

export const postDeleteComment = async (req, res) => {
    try {
        const videoID = req.params.id;
        let {
            body: { id: commentID },
        } = req;

        let video = await Video.findById(videoID).populate("comments");
        const target = await video.comments.filter((comment) => {
            return comment._id != commentID;
        });

        video.comments = target;
        await Comment.findByIdAndRemove(commentID);
        console.log(video);
        video.save();

        // console.log(commentID);

        // const video = await Video.findById(videoID).populate({
        //     path: "comments",
        //     model: "Comment",
        //     populate: {
        //         path: "creator",
        //         model: "User",
        //     },
        // });

        // const target = video.comments.filter((comment) => {
        // return comment.text == text && comment.creator.name == name && comment.createdAt == date;
        // });
        // console.log(Math.floor(date.getTime() / 1000));
        // console.log(Math.floor(video.comments[0].createdAt.getTime() / 1000));
        // console.log(Math.floor(date.getTime() / 1000) == Math.floor(video.comments[0].createdAt.getTime() / 1000));
        // console.log(target);
        // console.log(video.comments);
    } catch (error) {
        res.status(400);
        console.log(error);
    } finally {
        res.end();
    }
};

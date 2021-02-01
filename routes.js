const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

const VIDEOS = "/videos";
const VIDEO_DETAIL = "/:id";
const UPLOAD = "/upload";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

const API = "/api";
const REGISTER_VIEW = "/:id/view";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) => {
        return id ? `/users/${id}` : USER_DETAIL;
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    videoDetail: (id) => {
        return id ? `/videos/${id}` : VIDEO_DETAIL;
    },
    upload: UPLOAD,
    editVideo: (id) => {
        return id ? `/videos/${id}/edit` : EDIT_VIDEO;
    },
    deleteVideo: (id) => {
        return id ? `/videos/${id}/delete` : DELETE_VIDEO;
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me: ME,
    api: API,
    registerView: REGISTER_VIEW,
};

export default routes;

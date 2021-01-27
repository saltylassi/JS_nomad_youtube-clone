import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "join" });
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 },
    } = req;

    if (password !== password2) {
        res.status(400);
        //TODO, 에러메시지
        res.render("join", { pageTitle: "join" });
    } else {
        try {
            const user = await User({
                name,
                email,
            }); //오브젝트만 생성, DB에 등록은 하지 않았음

            await User.register(user, password); //DB등록
            next();
            //TODO, 사용자 자동 로그인
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "login" });
};

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    const {
        _json: { id: githubId, avatar_url: avatarUrl, name, email },
    } = profile;

    try {
        const user = await User.findOne({
            email,
        });
        console.log(user);
        if (user) {
            user.githubId = githubId;
            user.save();
            return cb(null, user); //에러없이 user만 return, 쿠키에저장
        } else {
            const newUser = await User.create({
                email,
                name,
                githubId,
                avatarUrl,
            });
            return cb(null, newUser);
        }
    } catch (error) {
        return cb(error);
    }
};

export const logout = (req, res) => {
    //TODO, 로그아웃 기능
    req.logout();
    res.redirect(routes.home);
};

export const getMe = async (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
    const {
        params: { id },
    } = req;

    try {
        const user = await User.findById(id);
        console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
};
export const getEditProfile = (req, res) => {
    res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file,
        user: { _id: id },
    } = req;

    console.log(file.path);

    // const user = await User.findById(id);
    // console.log(user);
    try {
        await User.findByIdAndUpdate(id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.AvatarUrl,
        });

        res.redirect(routes.me);
    } catch (error) {
        console.log(error);
        res.redirect("editProfile", {
            pageTitle: "Edit Profile",
        });
    }
};

export const changePassword = (req, res) => {
    res.render("changePassword", { pageTitle: "Change Password" });
};

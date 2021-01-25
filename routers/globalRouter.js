import express from "express";
import passport from "passport";
import {
    postJoin,
    getJoin,
    postLogin,
    getLogin,
    logout,
    githubLogin,
    postGithubLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); //postJoin은 middleware취급

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", { failureRedirect: "/login" }),
    postGithubLogin
);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

export default globalRouter;

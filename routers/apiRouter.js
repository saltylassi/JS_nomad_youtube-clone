import express from "express";
import routes from "../routes";
import { postAddComment, postRegisterView, postDeleteComment } from "../controllers/videoController";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);
apiRouter.post(routes.deleteComment, onlyPrivate, postDeleteComment);

export default apiRouter;

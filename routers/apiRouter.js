import express from "express";
import routes from "../routes";
import { postAddcomment, postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddcomment);

export default apiRouter;

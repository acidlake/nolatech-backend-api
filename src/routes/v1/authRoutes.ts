import Router from "koa-router";
import { login } from "../../controllers/v1/authController";

const router = new Router();

router.post("/auth/login", login);

export default router.routes();

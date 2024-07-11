import Router from "koa-router";
import { getHealthStatus } from "../../controllers/v1/healthController";

const router = new Router();

router.get("/health", getHealthStatus);

export default router.routes();

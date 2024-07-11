import Router from "koa-router";
import healthRoutes from "./routes/v1/healthRoutes";
import userRoutes from "./routes/v1/userRoutes";
import authRoutes from "./routes/v1/authRoutes";

const router = new Router({
  prefix: "/api/v1",
});

router.use(authRoutes);
router.use(userRoutes);
router.use(healthRoutes);
router.use(router.allowedMethods());

export default router.routes();

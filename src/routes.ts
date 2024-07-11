import Router from "koa-router";
import healthRoutes from "./routes/v1/healthRoutes";

const router = new Router({
  prefix: "/api/v1",
});

router.use(healthRoutes);

export default router.routes();

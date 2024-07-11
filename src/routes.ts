import Router from "koa-router";

export const router = new Router();

router.get("/api/v1/health", (ctx, next) => {
  ctx.body = "API Up and running..";
});

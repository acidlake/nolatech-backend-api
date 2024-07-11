import { Context } from "koa";

export const getHealthStatus = async (ctx: Context): Promise<void> => {
  ctx.status = 200;
  ctx.body = { status: "up and running.." };
};

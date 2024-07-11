import { Context, Next } from "koa";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticate = async (ctx: Context, next: Next): Promise<void> => {
  const token = ctx.headers.authorization?.split(" ")[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = {
      error: "Authentication token is required",
    };
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.state.user = decoded;
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      error: "Invalid or expired token",
    };
  }
};

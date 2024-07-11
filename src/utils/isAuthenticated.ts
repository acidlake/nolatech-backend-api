import jwt from "jsonwebtoken";
import { Context } from "koa";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Check if the request contains a valid JWT token.
 *
 * @param {Context} ctx - Koa context object.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
export function isAuthenticated(ctx: Context): boolean {
  const token = ctx.headers.authorization?.split(" ")[1];

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

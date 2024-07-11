import { Context } from "koa";
import { UserDataSource } from "../../server/db/queries/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../../db";
import { LoginRequestBody } from "../../interfaces/user-interface";
import {
  UserNotFoundError,
  InvalidPasswordError,
  UserDeletedError,
  UserInactiveError,
} from "../../errors/CustomErrors";
import { validateUserStatus } from "../../utils/validateUserStatus";

const backend = new UserDataSource(db, bcrypt, jwt, validateUserStatus);

export const login = async (ctx: Context): Promise<void> => {
  const { identification, password } = ctx.request.body as LoginRequestBody;

  try {
    const token = await backend.createIdentificationSession(
      identification,
      password,
    );
    ctx.status = 200;
    ctx.body = {
      success: true,
      token,
    };
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof InvalidPasswordError
    ) {
      ctx.status = 401;
    } else if (error instanceof UserInactiveError) {
      ctx.status = 403;
    } else if (error instanceof UserDeletedError) {
      ctx.status = 410;
    } else {
      ctx.status = 500;
    }
    ctx.body = { error: (error as Error).message };
  }
};

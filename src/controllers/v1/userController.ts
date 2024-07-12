import { Context } from "koa";
import { UserDataSource } from "../../server/db/queries/users";
import { FetchUserDTO } from "../../dto/v1/fetchUserDto";
import { CreateUserDTO } from "../../dto/v1/createUserDto";
import { ICreateUserInterface } from "../../interfaces/user-interface";
import { validateUserStatus } from "../../utils/validateUserStatus";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../db";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { validateUserData } from "../../utils/validateUserData";
import {
  EmailExistsError,
  InvalidEmailError,
  PasswordLengthError,
  UsernameExistsError,
} from "../../errors/CustomErrors";
import { SortEnum } from "../../interfaces/filter-interface";
import { UpdateUserDTO } from "../../dto/v1/updateUserDto";
import { validateUpdateUserData } from "../../utils/validateUpdateUserData";

const backend = new UserDataSource(db, bcrypt, jwt, validateUserStatus);

// GET All Users
export const index = async (ctx: Context): Promise<void> => {
  try {
    let limit: number = 10;
    let page: number = 1;
    let sort: SortEnum = SortEnum.DESC;

    const queryParams = ctx.query;

    if (queryParams.limit && typeof queryParams.limit === "string") {
      const parsedLimit = parseInt(queryParams.limit, 10);

      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        limit = parsedLimit;
      } else {
        console.warn(
          `Invalid limit parameter: ${queryParams.limit}. Using default.`,
        );
      }
    }

    if (queryParams.page && typeof queryParams.page === "string") {
      const parsedPage = parseInt(queryParams.page, 10);

      if (!isNaN(parsedPage) && parsedPage > 0) {
        page = parsedPage;
      } else {
        console.warn(
          `Invalid limit parameter: ${queryParams.page}. Using default.`,
        );
      }
    }

    if (
      (queryParams.sort && queryParams.sort === SortEnum.DESC) ||
      queryParams.sort === SortEnum.ASC
    ) {
      const parsedSort = queryParams.sort;
      if (sort.length > 0) {
        sort = parsedSort;
      } else {
        console.warn(
          `Invalid limit parameter: ${queryParams.sort}. Using default.`,
        );
      }
    }

    const userResponse = await backend.getAllUsers(limit, page, sort);
    const users = userResponse.map(
      (user) => new FetchUserDTO(user, isAuthenticated(ctx)),
    );

    const totalCount = await backend.getTotalUserCount();
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const meta = {
      page,
      limit,
      totalRecords: totalCount,
      totalPages,
      prevPage: hasPrevPage
        ? `${ctx.origin}${ctx.path}?limit=${limit}&page=${page - 1}`
        : null,
      nextPage: hasNextPage
        ? `${ctx.origin}${ctx.path}?limit=${limit}&page=${page + 1}`
        : null,
    };

    ctx.status = 200;
    ctx.body = {
      data: users,
      meta,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    ctx.status = 500;
    ctx.body = { error: "Error fetching users" };
  }
};

// POST
export const store = async (ctx: Context): Promise<void> => {
  const request = ctx.request;
  const userData: ICreateUserInterface =
    request.body as unknown as ICreateUserInterface;

  try {
    await validateUserData(userData);
    const newUser = CreateUserDTO(userData);
    const response = await backend.storeUser(newUser);

    ctx.status = 200;
    ctx.body = {
      success: true,
    };
  } catch (error) {
    if (
      error instanceof EmailExistsError ||
      error instanceof UsernameExistsError ||
      error instanceof PasswordLengthError ||
      error instanceof InvalidEmailError
    ) {
      ctx.status = 400;
      ctx.body = {
        error: error.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Error adding user" };
    }
  }
};

// GET By UID
export const show = async (ctx: Context): Promise<void> => {
  const params = ctx.params;
  const id = params.id;

  try {
    const response = await backend.getUser(id);
    const user = new FetchUserDTO(response, isAuthenticated(ctx));

    ctx.status = 200;
    ctx.body = {
      user,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    ctx.status = 500;
    ctx.body = { error: "Error fetching user" };
  }
};

// PUT-PATCH
export const update = async (ctx: Context): Promise<void> => {
  const request = ctx.request;
  const params = ctx.params;
  const userData: ICreateUserInterface =
    request.body as unknown as ICreateUserInterface;
  const id = params.id;

  try {
    await validateUpdateUserData(userData);

    const sanitizeData = UpdateUserDTO(userData);

    await backend.updateUser(id, sanitizeData);

    ctx.status = 200;
    ctx.body = {
      success: true,
    };
  } catch (error) {
    if (
      error instanceof EmailExistsError ||
      error instanceof UsernameExistsError ||
      error instanceof PasswordLengthError ||
      error instanceof InvalidEmailError
    ) {
      ctx.status = 400;
      ctx.body = {
        error: error.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Error updating user" };
    }
  }
};

// Delete
export const destroy = async (ctx: Context): Promise<void> => {
  const params = ctx.params;
  const id = params.id;
  try {
    const response = await backend.destroyUser(id);

    ctx.status = 200;
    ctx.body = "User delete successfully";
  } catch (error) {
    console.error("Error deleting user:", error);
    ctx.status = 500;
    ctx.body = { error: "Error deleting user" };
  }
};

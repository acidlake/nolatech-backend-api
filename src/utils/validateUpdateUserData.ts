import db from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  EmailExistsError,
  UsernameExistsError,
  PasswordLengthError,
  InvalidEmailError,
} from "../errors/CustomErrors";
import { ICreateUserInterface } from "../interfaces/user-interface";
import { UserDataSource } from "../server/db/queries/users";
import { validateUserStatus } from "./validateUserStatus";
import { checkPasswordLength } from "./checkPasswordLength";
import { checkEmailExists } from "./checkEmailExists";
import { checkUsernameExists } from "./checkUsernameExists";
import { checkEmailValidity } from "./checkEmailValidity";

const backend = new UserDataSource(db, bcrypt, jwt, validateUserStatus);

export async function validateUpdateUserData(
  userData: Partial<ICreateUserInterface>,
): Promise<void> {
  if (userData.email) {
    if (!checkEmailValidity(userData.email)) {
      throw new InvalidEmailError();
    }
    const emailExists = await checkEmailExists(userData.email || "", backend);
    if (emailExists) {
      throw new EmailExistsError();
    }
  }
  if (userData.username) {
    const checkUsername = await checkUsernameExists(
      userData.username || "",
      backend,
    );
    if (checkUsername) {
      throw new UsernameExistsError();
    }
  }

  if (userData.password) {
    const passwordLength = checkPasswordLength(userData.password || "");
    if (!passwordLength) {
      throw new PasswordLengthError();
    }
  }
}

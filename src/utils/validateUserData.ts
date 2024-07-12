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
import { checkEmailExists } from "./checkEmailExists";
import { checkUsernameExists } from "./checkUsernameExists";
import { checkPasswordLength } from "./checkPasswordLength";
import { checkEmailValidity } from "./checkEmailValidity";

const backend = new UserDataSource(db, bcrypt, jwt, validateUserStatus);

export async function validateUserData(
  userData: Partial<ICreateUserInterface>,
): Promise<void> {
  if (!checkEmailValidity(userData.email || "")) {
    throw new InvalidEmailError();
  }

  const emailExists = await checkEmailExists(userData.email || "", backend);
  if (emailExists) {
    throw new EmailExistsError();
  }

  const checkUsername = await checkUsernameExists(
    userData.username || "",
    backend,
  );
  if (checkUsername) {
    throw new UsernameExistsError();
  }

  const passwordLength = checkPasswordLength(userData.password || "");
  if (!passwordLength) {
    throw new PasswordLengthError();
  }
}

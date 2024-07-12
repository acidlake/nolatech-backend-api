import db from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  EmailExistsError,
  UsernameExistsError,
  PasswordLengthError,
} from "../errors/CustomErrors";
import { ICreateUserInterface } from "../interfaces/user-interface";
import { UserDataSource } from "../server/db/queries/users";
import { validateUserStatus } from "./validateUserStatus";

const backend = new UserDataSource(db, bcrypt, jwt, validateUserStatus);

export async function validateUserData(
  userData: Partial<ICreateUserInterface>,
): Promise<void> {
  const emailExists = await checkEmailExists(userData.email || "");
  if (emailExists) {
    throw new EmailExistsError();
  }

  const checkUsername = await checkUsernameExists(userData.username || "");
  if (checkUsername) {
    throw new UsernameExistsError();
  }

  const passwordLength = checkPasswordLength(userData.password || "");
  if (!passwordLength) {
    throw new PasswordLengthError();
  }
}

async function checkEmailExists(email: string): Promise<boolean> {
  return await backend.getUserByEmail(email);
}

async function checkUsernameExists(username: string): Promise<boolean> {
  return await backend.getUserByUsername(username);
}

function checkPasswordLength(password: string): boolean {
  if (!password) return false;

  if (password.length < 6 || password.length > 20) {
    return false;
  }

  return true;
}

import db from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDataSource } from "../server/db/queries/users";
import { validateUserStatus } from "./validateUserStatus";

const backend = new UserDataSource(db, bcrypt, jwt, validateUserStatus);

/**
 * Checks if an email already exists in the database.
 *
 * @param {string} email - The email to check.
 * @param {typeof backend} backendService - The backend service instance.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the email exists, otherwise false.
 */
export async function checkEmailExists(
  email: string,
  backendService: typeof backend,
): Promise<boolean> {
  return await backendService.getUserByEmail(email);
}

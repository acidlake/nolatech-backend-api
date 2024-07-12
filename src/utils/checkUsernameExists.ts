import db from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDataSource } from "../server/db/queries/users";
import { validateUserStatus } from "./validateUserStatus";

const backend = new UserDataSource(db, bcrypt, jwt, validateUserStatus);

/**
 * Checks if a username already exists in the database.
 *
 * @param {string} username - The username to check.
 * @param {typeof backend} backendService - The backend service instance.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the username exists, otherwise false.
 */
export async function checkUsernameExists(
  username: string,
  backendService: typeof backend,
): Promise<boolean> {
  return await backendService.getUserByUsername(username);
}

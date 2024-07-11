import { IUserInterface } from "../../../interfaces/user-interface";
import db from "../../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DatabaseInterface } from "../../../interfaces/infraestructure/DatabaseInterface";
import { validateUserStatus } from "../../../utils/validateUserStatus";

/**
 * UserDataSource class implementing the DatabaseInterface for user-related operations.
 *
 * @class UserDataSource
 * @implements {DatabaseInterface}
 */
export class UserDataSource implements DatabaseInterface {
  private datasource: typeof db;
  private encryptionLib: typeof bcrypt;
  private tokenLib: typeof jwt;
  private validation: typeof validateUserStatus;

  /**
   * Creates an instance of UserDataSource.
   *
   * @param {typeof db} db - The database connection.
   * @param {typeof bcrypt} bcrypt - The encryption library
   * @param {typeof jwt} Jwt - The JWT library
   * @param {typeof validationUserStatus} validationUserStatus - Validation User Status Util
   */
  constructor(
    datasource: typeof db,
    encryptionLib: typeof bcrypt,
    tokenLib: typeof jwt,
    validation: typeof validateUserStatus,
  ) {
    this.datasource = db;
    this.encryptionLib = encryptionLib;
    this.tokenLib = tokenLib;
    this.validation = validateUserStatus;
  }

  /**
   * Fetches all users with pagination.
   *
   * @param {number} [limit=10] - The number of users to fetch.
   * @param {number} [page=1] - The page number to fetch.
   * @returns {Promise<IUserInterface[]>} - A promise that resolves to an array of users.
   */
  async getAllUsers(
    limit: number = 10,
    page: number = 1,
  ): Promise<IUserInterface[]> {
    const offset = (page - 1) * limit;
    return (await this.datasource("users")
      .select("*")
      .limit(limit)
      .offset(offset)) as unknown as IUserInterface[];
  }

  /**
   * Gets the total count of users.
   *
   * @returns {Promise<number>} - A promise that resolves to the total count of users.
   */
  async getTotalUserCount(): Promise<number> {
    const result = await this.datasource("users").count("* as count").first();
    return result ? Number(result.count) : 0;
  }

  /**
   * Fetches a user by ID.
   *
   * @param {string} id - The ID of the user to fetch.
   * @returns {Promise<IUserInterface>} - A promise that resolves to the user.
   */
  async getUser(id: string): Promise<IUserInterface> {
    const response = (await this.datasource("users")
      .where({ id })
      .first()) as unknown as IUserInterface;
    return response;
  }

  /**
   * Stores a new user in the database.
   *
   * @param {Partial<IUserInterface>} userData - The data of the user to store.
   * @returns {Promise<IUserInterface>} - A promise that resolves to the stored user.
   */
  async storeUser(userData: Partial<IUserInterface>): Promise<IUserInterface> {
    return (await this.datasource("users")
      .insert(userData, "*")
      .first()) as unknown as IUserInterface;
  }

  /**
   * Deletes a user by ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  async destroyUser(id: string): Promise<void> {
    await this.datasource("users").where({ id }).del();
  }

  /**
   * Validates user status and password for authentication.
   *
   * @param {any} user - The user object fetched from the database.
   * @param {string} password - The password entered by the user.
   * @param {string} userPasswordHash - The hashed password stored in the database.
   * @param {(hash: string, password: string) => boolean} comparePassword - Function to compare passwords.
   * @throws {UserNotFoundError} If user is not found.
   * @throws {UserInactiveError} If user is inactive.
   * @throws {UserDeletedError} If user account is deleted.
   * @throws {InvalidPasswordError} If password is invalid.
   * @throws {Error} If user status is unknown.
   */

  async createIdentificationSession(
    identification: string,
    password: string,
  ): Promise<string> {
    const user = await this.datasource("users")
      .where({ username: identification })
      .orWhere({ email: identification })
      .first();

    if (!user || !this.encryptionLib.compareSync(password, user.passwordHash)) {
      throw new Error("Invalid username or password");
    }
    this.validation(
      user,
      password,
      user.passwordHash,
      this.encryptionLib.compareSync.bind(this.encryptionLib),
    );

    const token = this.tokenLib.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return token;
  }
}

import { IUserInterface } from "../../../interfaces/user-interface";
import db from "../../../db";
import { DatabaseInterface } from "../../../interfaces/infraestructure/DatabaseInterface";

/**
 * UserDataSource class implementing the DatabaseInterface for user-related operations.
 *
 * @class UserDataSource
 * @implements {DatabaseInterface}
 */
export class UserDataSource implements DatabaseInterface {
  private datasource: typeof db;

  /**
   * Creates an instance of UserDataSource.
   *
   * @param {typeof db} db - The database connection.
   */
  constructor(datasource: typeof db) {
    this.datasource = db;
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
}

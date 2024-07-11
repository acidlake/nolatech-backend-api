import { IUserInterface } from "../user-interface";

/**
 * Interface representing the database operations.
 *
 * @interface DatabaseInterface
 */
export interface DatabaseInterface {
  /**
   * Fetches all users with pagination.
   *
   * @param {number} limit - The number of users to fetch.
   * @param {number} page - The page number to fetch.
   * @returns {Promise<IUserInterface[]>} - A promise that resolves to an array of users.
   */
  getAllUsers(limit: number, page: number): Promise<IUserInterface[]>;

  /**
   * Gets the total count of users.
   *
   * @returns {Promise<number>} - A promise that resolves to the total count of users.
   */
  getTotalUserCount(): Promise<number>;

  /**
   * Fetches a user by ID.
   *
   * @param {string} id - The ID of the user to fetch.
   * @returns {Promise<IUserInterface>} - A promise that resolves to the user.
   */
  getUser(id: string): Promise<IUserInterface>;

  /**
   * Stores a new user in the database.
   *
   * @param {Partial<IUserInterface>} userData - The data of the user to store.
   * @returns {Promise<IUserInterface>} - A promise that resolves to the stored user.
   */
  storeUser(userData: Partial<IUserInterface>): Promise<IUserInterface>;

  /**
   * Deletes a user by ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  destroyUser(id: string): Promise<void>;

  /**
   * Creates an email session for a user.
   *
   * @param {string} identification - The username or email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} - A promise that resolves to the session token.
   */
  createIdentificationSession(
    identification: string,
    password: string,
  ): Promise<string>;
}

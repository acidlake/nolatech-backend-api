import { IUserInterface } from "../../interfaces/user-interface";

/**
 * Data Transfer Object (DTO) for fetching user data.
 */
export class FetchUserDTO {
  private id: string;
  private firstName: string;
  private lastName: string;
  private username: string;
  private status: string;
  private created_at: Date;
  private updated_at: Date;

  /**
   * Constructor to create a FetchUserDTO instance.
   *
   * @param {IUserInterface} user - The user object containing user data.
   */
  constructor(user: IUserInterface) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.status = user.status;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }

  /**
   * Converts the FetchUserDTO instance to a JSON object.
   *
   * @returns {Record<string, any>} The JSON representation of the user.
   */
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      status: this.status,
      created_at: new Date(this.created_at),
      updated_at: new Date(this.updated_at),
    };
  }
}

import { IUserInterface } from "../../interfaces/user-interface";

/**
 * Data Transfer Object (DTO) for fetching user data.
 */
export class FetchUserDTO {
  private id: string;
  private firstName: string;
  private lastName: string;
  private username: string = "";
  private email: string = "";
  private status: string = "";
  private created_at: Date = new Date();
  private updated_at: Date = new Date();

  /**
   * Constructor to create a FetchUserDTO instance.
   *
   * @param {IUserInterface} user - The user object containing user data.
   */
  constructor(user: IUserInterface, isAuthenticated: boolean) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;

    if (isAuthenticated) {
      this.username = user.username;
      this.email = user.email;
      this.status = user.status;
      this.created_at = user.created_at;
      this.updated_at = user.updated_at;
    }
  }

  /**
   * Converts the FetchUserDTO instance to a JSON object.
   *
   * @returns {Record<string, any>} The JSON representation of the user.
   */
  toJSON(): Record<string, any> {
    const json: Record<string, any> = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
    };
    if (this.username !== undefined) {
      json.username = this.username;
    }
    if (this.email !== undefined) {
      json.email = this.email;
    }
    if (this.status !== undefined) {
      json.status = this.status;
    }
    if (this.created_at !== undefined) {
      json.created_at = new Date(this.created_at);
    }
    if (this.updated_at !== undefined) {
      json.updated_at = new Date(this.updated_at);
    }

    return json;
  }
}

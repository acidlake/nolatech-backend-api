import { UserStatusEnum } from "../interfaces/user-interface";
import {
  UserNotFoundError,
  UserInactiveError,
  UserDeletedError,
  InvalidPasswordError,
} from "../errors/CustomErrors";

/**
 * Validates user status and password for authentication.
 *
 * @param {any} user: The user object fetched from the database.
 * @param {string} password: The password entered by the user.
 * @param {string} userPasswordHash: The hashed password stored in the database.
 * @param {(hash: string, password: string) => boolean} comparePassword: Function to compare passwords.
 * @throws {UserNotFoundError}: Throws if the user is not found.
 * @throws {UserInactiveError}: Throws if the user is inactive.
 * @throws {UserDeletedError}: Throws if the user account is deleted.
 * @throws {InvalidPasswordError}: Throws if the password is invalid.
 * @throws {Error}: Throws if the user status is unknown.
 */
export function validateUserStatus(
  user: any,
  password: string,
  userPasswordHash: string,
  comparePassword: (hash: string, password: string) => boolean,
): void {
  if (!user) {
    throw new UserNotFoundError("Invalid username or email");
  }

  switch (user.status) {
    case UserStatusEnum.INACTIVE:
      throw new UserInactiveError(
        "Your user is inactive, please contact the administrator",
      );
    case UserStatusEnum.DELETED:
      throw new UserDeletedError(
        "Your account is deleted, please contact the administrator",
      );
    case UserStatusEnum.ACTIVE:
      if (!comparePassword(password, userPasswordHash)) {
        throw new InvalidPasswordError("Invalid password");
      }
      break;
    default:
      throw new Error("Unknown user status");
  }
}

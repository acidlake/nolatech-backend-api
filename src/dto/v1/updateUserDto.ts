import {
  ICreateUserInterface,
  IUserInterface,
} from "../../interfaces/user-interface";

/**
 * Data Transfer Object (DTO) for updating a user.
 *
 * @param {Partial<IUserInterface>} user - Partial user object containing user data.
 * @returns {Partial<IUserInterface>} The filtered user object with allowed fields.
 */
export function UpdateUserDTO(
  user: Partial<ICreateUserInterface>,
): Partial<IUserInterface> {
  const updatedUser: Partial<IUserInterface> = {
    updated_at: new Date(),
  };

  if (user.firstName) {
    updatedUser.firstName = user.firstName;
  }

  if (user.lastName) {
    updatedUser.lastName = user.lastName;
  }

  if (user.status) {
    updatedUser.status = user.status;
  }

  if (user.password) {
    updatedUser.passwordHash = user.password;
  }

  return updatedUser;
}

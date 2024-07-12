import {
  ICreateUserInterface,
  IUserInterface,
  UserStatusEnum,
} from "../../interfaces/user-interface";
import hashPassword from "../../utils/hashPassword";
import uuidGenerator from "../../utils/uuidGenerator";

/**
 * Data Transfer Object (DTO) for creating a user.
 *
 * @param {Partial<IUserInterface>} user - Partial user object containing user data.
 * @returns {IUserInterface} The complete user object with defaults and generated fields.
 */
export function CreateUserDTO(user: ICreateUserInterface): IUserInterface {
  return {
    id: crypto.randomUUID(),
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    email: user.email || "",
    passwordHash: hashPassword(user.password || ""),
    status: user.status || UserStatusEnum.ACTIVE,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

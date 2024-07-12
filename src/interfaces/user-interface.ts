export enum UserStatusEnum {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  INACTIVE = "INACTIVE",
}

export type IUserInterface = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  passwordHash: string;
  email: string;
  status: UserStatusEnum;
  created_at: Date;
  updated_at: Date;
};

export type ICreateUserInterface = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  status: UserStatusEnum;
  email: string;
};

export interface LoginRequestBody {
  identification: string;
  password: string;
}

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
  password: string;
  email: string;
  status: UserStatusEnum;
  created_at: Date;
  updated_at: Date;
};

export interface LoginRequestBody {
  identification: string;
  password: string;
}

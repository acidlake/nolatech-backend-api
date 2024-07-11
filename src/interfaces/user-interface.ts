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
  status: UserStatusEnum;
  created_at: Date;
  updated_at: Date;
};

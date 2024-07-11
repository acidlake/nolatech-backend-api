export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidPasswordError";
  }
}

export class UserInactiveError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserInactiveError";
  }
}

export class UserDeletedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserDeletedError";
  }
}

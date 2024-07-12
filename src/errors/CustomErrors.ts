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

export class EmailExistsError extends Error {
  constructor(message: string = "Email already exists") {
    super(message);
    this.name = "EmailExistsError";
  }
}

export class UsernameExistsError extends Error {
  constructor(message: string = "Username already exists") {
    super(message);
    this.name = "UsernameExistsError";
  }
}

export class PasswordLengthError extends Error {
  constructor(
    message: string = "Password must be between 6 and 20 characters",
  ) {
    super(message);
    this.name = "PasswordLenghtError";
  }
}

export class InvalidEmailError extends Error {
  constructor(message: string = "Invalid email format") {
    super(message);
    this.name = "InvalidEmailError";
  }
}

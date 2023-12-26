export enum ErrorCode {
  WRONG_VALIDATE = -1,
}

export enum StudentErrorCode {
  NOT_FOUND = 1,
  VALIDATE_FAILED = 2,
  INVALID_TOKEN = 3,
}

export enum AdminErrorCode {
  EXIST_EMAIL = 101,
  VALIDATE_FAILED = 102,
  INVALID_POSITION = 103,
  ADMIN_NOTFOUND = 104,
  INVALID_TOKEN = 105,
  UNAUTHORIZED = 106,
}

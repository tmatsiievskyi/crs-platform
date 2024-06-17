import { HttpStatusCode } from '@itypes';

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number = HttpStatusCode.BAD_REQUEST,
  ) {
    super(message);
  }
}

export class AuthError extends AppError {
  constructor(
    public readonly message: string,
    public readonly status: number = HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED,
  ) {
    super(message);
  }
}

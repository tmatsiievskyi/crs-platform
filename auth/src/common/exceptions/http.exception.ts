import { EHttpStatusCode, EMessageCode } from '@common/enums';
import { exceptionsMessages } from '@common/messages';
import { TException, TExceptionMessage } from '@common/types';

export class HttpException extends Error {
  readonly message: string | object | any;
  readonly messageCode: EMessageCode;
  readonly statusCode: EHttpStatusCode;

  constructor(param?: Partial<TException>) {
    super();

    this.message =
      param?.message ||
      'The server encountered an error while processing the request.';
    this.messageCode = param?.messageCode || EMessageCode.INTERNAL_SERVER_ERROR;
    this.statusCode =
      param?.statusCode || EHttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}

export class AppHttpException extends HttpException {
  constructor(
    message?: TExceptionMessage,
    code?: EHttpStatusCode,
    messageCode?: EMessageCode,
  ) {
    super({
      message: message || exceptionsMessages.internalServerError,
      messageCode: messageCode || EMessageCode.INTERNAL_SERVER_ERROR,
      statusCode: code || EHttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message?: TExceptionMessage) {
    super({
      message: message || exceptionsMessages.unprocessableEntity,
      messageCode: EMessageCode.UNPROCESSABLE_ENTITY,
      statusCode: EHttpStatusCode.UNPROCESSABLE_ENTITY,
    });
  }
}

export class InternalServerExceptions extends HttpException {
  constructor(message?: TExceptionMessage) {
    super({
      message: message || exceptionsMessages.internalServerError,
      messageCode: EMessageCode.INTERNAL_SERVER_ERROR,
      statusCode: EHttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
}

export class TokenVerifyExceptions extends HttpException {
  constructor(message?: TExceptionMessage) {
    super({
      message: message || exceptionsMessages.tokenVerify,
      messageCode: EMessageCode.TOKEN_VERIFY,
      statusCode: EHttpStatusCode.UNAUTHORIZED,
    });
  }
}

export class TokenExpiredExceptions extends HttpException {
  constructor(message?: TExceptionMessage) {
    super({
      message: message || exceptionsMessages.tokenExpired,
      messageCode: EMessageCode.TOKEN_EXPIRED,
      statusCode: EHttpStatusCode.UNAUTHORIZED,
    });
  }
}

export class MissingConfigOptionException extends HttpException {
  constructor(message?: TExceptionMessage) {
    super({
      message: message || exceptionsMessages.tokenExpired,
      messageCode: EMessageCode.FORBIDDEN,
      statusCode: EHttpStatusCode.FORBIDDEN,
    });
  }
}

export class AlreadyExistException extends HttpException {
  constructor(message?: TExceptionMessage) {
    super({
      message: message || exceptionsMessages.alreadyExists,
      messageCode: EMessageCode.BAD_REQUEST,
      statusCode: EHttpStatusCode.BAD_REQUEST,
    });
  }
}

import { EHttpStatusCode, EMessageCode } from '@common/enums';
import { HttpException } from '@common/exceptions/http.exception';
import {
  TErrorRequestHandler,
  TRequest,
  TResponse,
  TNext,
  TExceptionMessage,
  TException,
} from '@common/types';
import { MiddlewareCore } from '@core';
import { singleton } from 'tsyringe';

@singleton()
export class ErrorMiddleware extends MiddlewareCore {
  handler(): TErrorRequestHandler {
    return (
      exception: HttpException,
      _req: TRequest,
      res: TResponse,
      _next: TNext,
    ) => {
      const data = this.createRespData(exception);

      res.status(data.statusCode).json({ data });
    };
  }

  private createRespData(exception: HttpException): TException {
    const statusCode = this.extractStatusCode(exception);
    const messageCode = this.extractMessageCode(statusCode, exception);
    const message = this.extractMessage(exception);

    return { message, messageCode, statusCode };
  }

  private extractMessage(exception: HttpException): TExceptionMessage {
    if (typeof exception === 'object' && 'message' in exception) {
      return exception.message as TExceptionMessage;
    }

    return exception;
  }

  private extractMessageCode(
    httpStatusCode: EHttpStatusCode,
    exception: HttpException,
  ): EMessageCode {
    if (typeof exception === 'object' && 'messageCode' in exception) {
      return exception.messageCode;
    }

    const httpStatusKey =
      httpStatusCode in EHttpStatusCode ? EHttpStatusCode[httpStatusCode] : '';
    return EMessageCode[httpStatusKey] || EMessageCode.INTERNAL_SERVER_ERROR;
  }

  private extractStatusCode(exception: HttpException) {
    return exception?.statusCode || EHttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}

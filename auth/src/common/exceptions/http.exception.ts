import { EHttpStatusCode, EMessageCode } from '@common/enums';
import { TException } from '@common/types/exceptions.type';

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

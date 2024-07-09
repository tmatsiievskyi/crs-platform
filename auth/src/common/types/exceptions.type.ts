import { EHttpStatusCode, EMessageCode } from '@common/enums';

export type TExceptionMessage = string | Record<string, string>[];

export type TException = {
  message: TExceptionMessage;
  messageCode: EMessageCode;
  statusCode: EHttpStatusCode;
};

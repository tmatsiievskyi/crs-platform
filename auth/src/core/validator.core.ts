import { UnprocessableEntityException } from '@common/exceptions/http.exception';
import { StringUtil } from '@common/utils';

export class ValidatorCore {
  protected throwException(
    key: string,
    messageKey: string = key,
    ctx?: Record<string, string | number>,
  ) {
    const value = this.getExceptionValue(messageKey, ctx);

    throw new UnprocessableEntityException([{ value, key }]);
  }

  private getExceptionValue(
    message: string,
    ctx?: Record<string, string | number>,
  ) {
    return ctx ? StringUtil.replace(message, ctx) : message;
  }
}

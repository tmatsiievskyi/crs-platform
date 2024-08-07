import { EHttpStatusCode, EMessageCode } from '@common/enums';
import { AppHttpException } from '@common/exceptions';
import { ILoggerService } from '@providers/logger';

export class ServiceCore {
  protected readonly logger?: ILoggerService;

  constructor() {
    this.init();
  }

  protected init() {
    if (!this.logger) {
      return;
    }

    this.logger.log(`${this.constructor.name} initialized...`);
  }

  protected handleError(err: {
    message?: string;
    code?: EHttpStatusCode;
    messageCode?: EMessageCode;
  }) {
    if (this.logger) {
      this.logger.error(this.constructor.name, { err });
    }
    return new AppHttpException(err.message, err.code, err.messageCode);
  }

  protected log(message: string) {
    if (!this.logger) return;

    return this.logger.log(message);
  }
}

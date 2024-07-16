import pinoHttp from 'pino-http';

import { EConfigKey, ELoggerCtx, ELogLevel } from '@common/enums';
import { TRequest } from '@common/types';
import { IAppConfig } from '@config/_types';
import { MiddlewareCore } from '@core';
import { ELoggerInject } from '@providers/logger';
import { LoggerService } from '@providers/logger/logger.service';
import { singleton, inject } from 'tsyringe';
import { ENV_PRODUCTION } from '@common/constants';

@singleton()
export class LoggerMiddleware extends MiddlewareCore {
  constructor(
    @inject(EConfigKey.APP) private readonly appConfig: IAppConfig,
    @inject(ELoggerInject.SERVICE)
    private readonly loggerService: LoggerService,
  ) {
    super();
  }

  handler() {
    return pinoHttp({
      customSuccessMessage: () => ELoggerCtx.HTTP,
      customReceivedMessage: () => ELoggerCtx.HTTP,
      customErrorMessage: () => ELoggerCtx.HTTP,

      customLogLevel: (_req, res, err) => {
        if (res?.statusCode >= 400 && res?.statusCode < 500) {
          return ELogLevel.WARN;
        } else if (res?.statusCode >= 500 || err) {
          return ELogLevel.ERROR;
        }

        return ELogLevel.INFO;
      },
      serializers: {
        req: (req: TRequest) => {
          return {
            id: req.id,
            method: req.method,
            url: req.url,
            query: req.query,
            params: req.params,
            userSession: req?.userSession,
          };
        },
        res: ({ statusCode, headers }: TRequest) => ({
          statusCode: statusCode || null,
          ...(this.appConfig.env !== ENV_PRODUCTION && {
            headers: headers || null,
          }),
        }),
      },
      logger: this.loggerService.pino,
    });
  }
}

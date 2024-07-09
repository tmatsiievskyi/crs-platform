import { Level, levels, pino } from 'pino';
import { inject, singleton } from 'tsyringe';

import { ENV_DEVELOPMENT, ENV_TEST } from '@common/constants';
import { EConfigKey, ELogClient, ELoggerCtx, ELogLevel } from '@common/enums';
import { IAppConfig, ILoggerConfig } from '@config/_types';

import {
  ELoggerInject,
  ILoggerService,
  ILoggerTransportServiceInterface,
} from './_types';

@singleton()
export class LoggerService implements ILoggerService {
  private readonly logger: pino.Logger;

  constructor(
    @inject(EConfigKey.APP) private readonly appConfig: IAppConfig,
    @inject(EConfigKey.LOGGER) private readonly loggerConfig: ILoggerConfig,
    @inject(ELoggerInject.CONSOLE_TRANSPORT_SERVICE)
    private readonly consoleTransport: ILoggerTransportServiceInterface,
  ) {
    this.logger = this.init();
  }

  get pino() {
    return this.logger;
  }

  debug(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(ELogLevel.DEBUG, message, optionalParams);
    }
  }

  error(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(ELogLevel.ERROR, message, optionalParams);
    }
  }

  log(message: string, ...optionalParams: unknown[]) {
    if (
      this.appConfig.env === ENV_DEVELOPMENT ||
      message === (ELoggerCtx.HTTP as string)
    ) {
      this.call(ELogLevel.INFO, message, optionalParams);
    }
  }

  verbose?(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(ELogLevel.TRACE, message, optionalParams);
    }
  }

  warn(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(ELogLevel.WARN, message, optionalParams);
    }
  }
  private call(level: Level, message: string, ...optionalParams: any[]) {
    let params: Record<string, any> = {};
    let args: unknown[] = [];
    const context: string[] = [];

    if (optionalParams.length !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      optionalParams[optionalParams.length - 1]?.forEach(
        (item: string | object) => {
          if (typeof item === 'string') {
            context.push(item);
          } else if (typeof item === 'object') {
            params = { ...params, ...item };
          }
        },
      );

      args = optionalParams.slice(0, -1);
    }

    this.logger[level](
      { level: levels.values[level], context, ...params },
      message,

      ...args,
    );
  }

  private init(): pino.Logger {
    switch (this.loggerConfig.client) {
      case ELogClient.CONSOLE:
      default:
        return pino(this.consoleTransport.options);
    }
  }
}

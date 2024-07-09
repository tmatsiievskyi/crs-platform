import { inject, singleton } from 'tsyringe';

import { EConfigKey, ELogLevel } from '@common/enums';
import { IAppConfig, ILoggerConfig } from '@config/_types';

import { ILoggerTransportServiceInterface } from './_types';
import { PRETTY_PRINT, SETTING_PINO } from './logger.const';

@singleton()
export class ConsoleTransport implements ILoggerTransportServiceInterface {
  constructor(
    @inject(EConfigKey.APP)
    private readonly appConfig: IAppConfig,
    @inject(EConfigKey.LOGGER)
    private readonly loggerConfig: ILoggerConfig,
  ) {}

  get options() {
    return {
      ...SETTING_PINO,
      level: ELogLevel.TRACE,
      name: this.appConfig.name,
      enabled: this.loggerConfig.enabled,
      transport: {
        target: 'pino-pretty',
        options: { destination: 1, ...PRETTY_PRINT },
      },
    };
  }
}

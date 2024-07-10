import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EConfigKey } from '@common/enums';
import { AppConfig } from './app.config';
import { LoggerConfig } from './logger.config';

class ConfigDi extends DiCore {
  register(): void {
    this.registerApp();
    this.registerLogger();
  }

  private registerApp() {
    container.registerSingleton(EConfigKey.APP, AppConfig);
  }

  private registerLogger() {
    container.registerSingleton(EConfigKey.LOGGER, LoggerConfig);
  }
}

new ConfigDi().register();

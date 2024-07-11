import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EConfigKey } from '@common/enums';
import { AppConfig } from './app.config';
import { LoggerConfig } from './logger.config';
import { JwtConfig } from './jwt.config';

class ConfigDi extends DiCore {
  register(): void {
    this.registerApp();
    this.registerLogger();
    this.registerJwt();
  }

  private registerApp() {
    container.registerSingleton(EConfigKey.APP, AppConfig);
  }

  private registerLogger() {
    container.registerSingleton(EConfigKey.LOGGER, LoggerConfig);
  }

  private registerJwt() {
    container.registerSingleton(EConfigKey.JWT, JwtConfig);
  }
}

new ConfigDi().register();

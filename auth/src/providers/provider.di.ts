import { DiCore } from '@core/di.core';

import { LoggerDi } from './logger/logger.di';

class ProviderDi extends DiCore {
  register() {
    new LoggerDi().register();
  }
}

new ProviderDi().register();

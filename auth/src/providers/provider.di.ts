import { DiCore } from '@core';

import { LoggerDi } from './logger/logger.di';
import { TokenDi } from './token/token.di';

class ProviderDi extends DiCore {
  register() {
    new LoggerDi().register();
    new TokenDi().register();
  }
}

new ProviderDi().register();

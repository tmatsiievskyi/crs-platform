import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EMiddlewareKey } from '@common/enums';
import { InitMiddleware } from './init.middleware';
import { LoggerMiddleware } from './logger.middleware';
import { ErrorMiddleware } from './error.middleware';
import { UserSessionMiddleware } from './userSession.middleware';

class MiddlewareDi extends DiCore {
  register(): void {
    this.registerInit();
    this.registerReqLogger();
    this.registerErrorHandler();
    this.registerUserSession();
  }

  private registerInit() {
    container.registerSingleton(EMiddlewareKey.INIT, InitMiddleware);
  }

  private registerReqLogger() {
    container.registerSingleton(EMiddlewareKey.LOGGER, LoggerMiddleware);
  }

  private registerErrorHandler() {
    container.registerSingleton(EMiddlewareKey.ERROR, ErrorMiddleware);
  }

  private registerUserSession() {
    container.registerSingleton(
      EMiddlewareKey.USER_SESSION,
      UserSessionMiddleware,
    );
  }
}

new MiddlewareDi().register();

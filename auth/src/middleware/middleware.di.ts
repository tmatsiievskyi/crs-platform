import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EMiddlewareKey } from '@common/enums';
import { InitMiddleware } from './init.middleware';
import { LoggerMiddleware } from './logger.middleware';
import { ErrorMiddleware } from './error.middleware';
import { UserSessionMiddleware } from './userSession.middleware';
import { ValidateMiddleware } from './validate.middleware';
import { AuthMiddleware } from './auth.middleware';
import { IMiddleware } from '@common/types';

class MiddlewareDi extends DiCore {
  register(): void {
    this.registerInit();
    this.registerReqLogger();
    this.registerErrorHandler();
    this.registerUserSession();
    this.registerValidate();
    this.registerAuth();
  }

  private registerInit() {
    container.registerSingleton<IMiddleware>(
      EMiddlewareKey.INIT,
      InitMiddleware,
    );
  }

  private registerReqLogger() {
    container.registerSingleton<IMiddleware>(
      EMiddlewareKey.LOGGER,
      LoggerMiddleware,
    );
  }

  private registerErrorHandler() {
    container.registerSingleton<IMiddleware>(
      EMiddlewareKey.ERROR,
      ErrorMiddleware,
    );
  }

  private registerUserSession() {
    container.registerSingleton<IMiddleware>(
      EMiddlewareKey.USER_SESSION,
      UserSessionMiddleware,
    );
  }

  private registerValidate() {
    container.registerSingleton<IMiddleware>(
      EMiddlewareKey.VALIDATE,
      ValidateMiddleware,
    );
  }

  private registerAuth() {
    container.registerSingleton<IMiddleware>(
      EMiddlewareKey.AUTH,
      AuthMiddleware,
    );
  }
}

new MiddlewareDi().register();

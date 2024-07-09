import { EConfigKey } from '@common/enums';
import { TRequestHandler, TRequest, TResponse, TNext } from '@common/types';
import { MiddlewareCore } from '@core/middleware.core';
import { singleton, inject } from 'tsyringe';

@singleton()
export class InitMiddleware extends MiddlewareCore {
  constructor(@inject(EConfigKey.APP) private readonly appConfig) {
    super();
  }

  handler(): TRequestHandler {
    return (_req: TRequest, res: TResponse, next: TNext) => {
      res.header('X-Server', this.appConfig.name);

      next();
    };
  }
}

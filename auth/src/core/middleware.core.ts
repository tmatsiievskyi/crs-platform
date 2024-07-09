import {
  IMiddleware,
  TErrorRequestHandler,
  TRequestHandler,
} from '@common/types';

export abstract class MiddlewareCore implements IMiddleware {
  abstract handler(data?: any): TRequestHandler | TErrorRequestHandler;
}

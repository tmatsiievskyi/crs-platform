import { EHttpStatusCode } from '@common/enums';
import {
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

export type TRequestHandler = RequestHandler;
export type TErrorRequestHandler = ErrorRequestHandler;
export type TRequest<
  TParams = any,
  TResBody = any,
  TReqBody = any,
  TReqQuery = any,
> = Request<TParams, TResBody, TReqBody, TReqQuery>;
export type TResponse = Response;
export type TNext = NextFunction;
export type TDeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: TDeepPartial<T[P]>;
    }
  : T;

export type TContext = Partial<PayloadContext>;

export interface IMiddleware {
  handler(data?: any): TRequestHandler | TErrorRequestHandler;
}

export type TRespCtx = {
  status?: EHttpStatusCode;
};

export type TCookieParam = {
  domain: string;
  expiresIn: string;
  maxAge?: string;
};

export type TTokenPayload = {
  accessToken?: string;
  refreshToken?: string;
};

export type TId = string;

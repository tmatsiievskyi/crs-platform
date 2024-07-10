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

export interface IMiddleware {
  handler(data?: any): TRequestHandler | TErrorRequestHandler;
}

export type TRespCtx = {
  status?: EHttpStatusCode;
};

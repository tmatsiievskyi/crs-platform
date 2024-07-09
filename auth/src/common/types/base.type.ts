import {
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

export type TRequestHandler = RequestHandler;
export type TErrorRequestHandler = ErrorRequestHandler;
export type TRequest = Request;
export type TResponse = Response;
export type TNext = NextFunction;

export interface IMiddleware {
  handler(data?: any): TRequestHandler | TErrorRequestHandler;
}

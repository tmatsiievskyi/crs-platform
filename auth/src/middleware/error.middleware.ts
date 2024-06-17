import { AppError } from '@common';
import { HttpStatusCode, INext, IRequest, IResponse } from '@itypes';
import { Formatter } from '@utils';
import { Logger } from 'pino';
import { ZodError } from 'zod';

export const errorMiddleware =
  (logger: Logger, formatter: Formatter) =>
  (error: unknown, req: IRequest, res: IResponse, next: INext) => {
    if (error instanceof AppError) {
      logger.warn(error);
      res
        .status(error.status)
        .send(formatter.formatResp(error, false, 0, error.message));
    } else if (error instanceof ZodError) {
      logger.warn(error);
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .send(formatter.formatResp(error, false, 0, error.message));
    } else {
      const err = formatter.errorHandler(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(formatter.formatResp(err, false, 0, err.message));
    }
  };

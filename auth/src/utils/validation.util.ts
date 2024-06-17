import { INext, IRequest, IResponse } from '@itypes';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) => (req: IRequest, res: IResponse, next: INext) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      next();
    } catch (err: any) {
      next(err);
    }
  };

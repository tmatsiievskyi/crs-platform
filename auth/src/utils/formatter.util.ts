import { AppError } from '@common';
import { IApiResponse } from '@itypes';
import { ZodError } from 'zod';

export class Formatter {
  public formatResp<T>(
    result: any,
    ok: boolean,
    start?: number,
    message?: string,
    total?: number,
  ) {
    let numRecords = 0;
    let errors: any[] | null = null;
    let data = null;

    if (result instanceof ZodError) {
      errors = [result.errors];
    } else if (result instanceof AppError) {
      errors = [
        {
          message: result.message,
          status: result.status,
        },
      ];
    } else if (result instanceof Error) {
      errors = [this.errorStringify(result)];
    } else if (result instanceof Array) {
      numRecords = result.length;
      data = result;
    } else if (result || result === 0) {
      numRecords = 1;
      data = result;
    }

    const resp: IApiResponse<T> = {
      data,
      ok,
      errors,
      message: message ? message : null,
      meta: {
        length: numRecords,
        took: start ? Date.now() - start : 0,
        total: total ? total : numRecords,
      },
    };

    return JSON.stringify(resp);
  }

  public errorHandler(value: unknown): Error {
    if (value instanceof Error) return value;

    let stringified = '[Unable to stringify the thrown value]';
    try {
      stringified = JSON.stringify(value);
    } catch {}

    const error = new Error(`Error value: ${stringified}`);
    return error;
  }

  public errorStringify(error: Error): string {
    return JSON.stringify(
      Object.assign({}, error, {
        name: error.name,
        message: error.message,
        stack: error.stack,
      }),
    );
  }

  public omitFromObj<T extends object, K extends Extract<keyof T, string>>(
    obj: T,
    ...keys: K[]
  ): Omit<T, K> {
    let result: any = {};
    const excludeSet: Set<string> = new Set(keys);

    for (let key in obj) {
      if (!excludeSet.has(key)) {
        result[key] = obj[key];
      }
    }
    return result;
  }
}

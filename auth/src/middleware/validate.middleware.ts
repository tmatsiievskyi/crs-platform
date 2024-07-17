import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';

import {
  TRequestHandler,
  // TErrorRequestHandler,
  TJsonSchemaOptions,
  TRequest,
  TResponse,
  TNext,
  TExceptionMessage,
  TJsonSchema,
} from '@common/types';
import { MiddlewareCore } from '@core';
import { singleton } from 'tsyringe';
import { AjvFormatKey, EHttpStatusCode } from '@common/enums';
import { UnprocessableEntityException } from '@common/exceptions/http.exception';
import { AjvUtil, StringUtil } from '@common/utils';
import { REG_PHONE } from '@common/constants';

@singleton()
export class ValidateMiddleware extends MiddlewareCore {
  private ajv: Ajv;

  constructor() {
    super();

    this.ajv = new Ajv({ $data: true, allErrors: true, coerceTypes: true });
    addFormats(this.ajv);
    addErrors(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);

    this.registerFormat();
    this.registerKeyword();
  }

  public handler(schemas: TJsonSchemaOptions): TRequestHandler {
    return async (req: TRequest, res: TResponse, next: TNext) => {
      try {
        await this.validateRequest(schemas, req);

        next();
      } catch (error) {
        res.status(EHttpStatusCode.UNPROCESSABLE_ENTITY).json({
          data: new UnprocessableEntityException(error as TExceptionMessage),
        });
      }
    };
  }

  private registerFormat() {
    this.ajv.addFormat(AjvFormatKey.PHONE, REG_PHONE);
  }

  private registerKeyword() {
    this.ajv.addKeyword(AjvUtil.getSanitize());
  }

  private async validateRequest(
    schemas: TJsonSchemaOptions,
    req: TRequest<Record<string, unknown>, unknown, Record<string, unknown>>,
  ) {
    if (schemas.params) {
      await this.validate(schemas.params, req.params);
    }

    if (schemas.query) {
      await this.validate(schemas.query, req.query);
    }

    if (schemas.body) {
      await this.validate(schemas.body, req.body);
    }
  }

  private async validate(
    schema: TJsonSchema,
    data: Record<string, unknown>,
  ): Promise<void> {
    const validate = this.ajv.compile(schema);

    return new Promise((res, rej) => {
      if (!validate(data) && validate.errors) {
        const errors: Array<{ key: string; value: string }> = [];
        const len = validate.errors.length;

        for (const err of validate.errors) {
          const name =
            (err.params.missingProperty as string) ||
            (err.params.additionalProperty as string) ||
            (err.params.errors?.at(0)?.params?.missingProperty as string) ||
            (err.params.errors?.at(0)?.params?.additionalProperty as string) ||
            '';

          const fullName = `${err.instancePath}${name && `/${name}`}`.slice(1);

          if (fullName || (len === 1 && err.keyword === 'errorMessage')) {
            errors.push({
              key: fullName || 'data',
              value: StringUtil.capitalizeFirstChar(err.message || ''),
            });
          }
        }

        rej(errors);

        return;
      }

      res();
    });
  }
}

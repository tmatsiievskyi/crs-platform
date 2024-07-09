import joi from 'joi';

import { TJoiCtx } from '@common/types';

export class JoiUtil {
  static get schema() {
    return joi;
  }

  static validate<T>(key: string, ctx: TJoiCtx): T {
    const { error, value } = ctx.schema.validate(ctx.value);

    if (error) {
      throw new Error(JoiUtil.transformError(key, error));
    }

    return value as T;
  }

  private static transformError(key: string, error?: joi.ValidationError) {
    const value = error?.details?.[0]?.context?.value || '';
    const message = error?.message || '';

    return `Wrong "${key}" variable; Value: "${value}" is invalid. ${message}`;
  }
}

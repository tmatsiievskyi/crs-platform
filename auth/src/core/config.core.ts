import { join } from 'node:path';

import { config } from 'dotenv';

import { JoiUtil } from '@common/utils';
import { TJoiCtx } from '@common/types';

config({
  path: join(
    process.cwd(),
    `.env${process?.env?.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  ),
});

export abstract class ConfigCore {
  get schema() {
    return JoiUtil.schema;
  }

  public set<T = string>(key: string, schema: TJoiCtx['schema']): T {
    return JoiUtil.validate<T>(key, {
      schema,
      value: process?.env?.[key],
    });
  }

  protected abstract init(): void;
}

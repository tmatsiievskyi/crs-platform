import { ConfigCore } from '@core/config.core';
import { singleton } from 'tsyringe';
import { IAppConfig } from './_types';
import { TCors } from '@common/types';
import {
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ENV_TEST,
  TEnv,
} from '@common/constants';

@singleton()
export class AppConfig extends ConfigCore implements IAppConfig {
  cors!: TCors;
  domain!: string;
  env!: TEnv;
  host!: string;
  name!: string;
  port!: number;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.domain = this.set(
      'APP_DOMAIN',
      this.schema.string().allow(null, '').default('localhost'),
    );

    this.env = this.set(
      'NODE_ENV',
      this.schema
        .string()
        .valid(ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST)
        .allow(null, '')
        .default(ENV_DEVELOPMENT),
    );

    this.host = this.set(
      'APP_HOST',
      this.schema.string().allow(null, '').default('http://localhost'),
    );

    this.name = this.set(
      'APP_NAME',
      this.schema.string().allow(null, '').default(''),
    );

    this.port = this.set(
      'APP_PORT',
      this.schema.number().allow(null, '').default(4000),
    );

    this.cors = {
      credentials: this.set<boolean>(
        'APP_CORS_CREDENTIALS',
        this.schema.boolean().allow(null, '').default(true),
      ),
      origin: this.set<string[]>(
        'APP_CORS_ORIGINS',
        this.schema.string().allow(null, '').default('localhost'),
      ),
    };
  }
}

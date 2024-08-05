import { ConfigCore } from '@core';
import { IJwtConfig } from './_types';
import { TJwtToken } from '@common/types';
import { singleton } from 'tsyringe';

@singleton()
export class JwtConfig extends ConfigCore implements IJwtConfig {
  public accessToken!: TJwtToken;
  public refreshToken!: TJwtToken;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.accessToken = {
      secret: this.set(
        'JWT_SECRET_ACCESS_TOKEN',
        this.schema.string().required(),
      ),
      expiresIn: this.set(
        'JWT_EXPIRES_IN_ACCESS_TOKEN',
        this.schema.string().allow(null, '').default('60m'),
      ),
    };

    this.refreshToken = {
      secret: this.set(
        'JWT_SECRET_REFRESH_TOKEN',
        this.schema.string().required(),
      ),
      expiresIn: this.set(
        'JWT_EXPIRES_IN_REFRESH_TOKEN',
        this.schema.string().allow(null, '').default('30d'),
      ),
    };
  }
}

import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EAuthKey } from '@common/enums';
import { AuthController } from './auth.controller';
import {
  IAuthController,
  IAuthSchema,
  IAuthService,
  IAuthTokenService,
} from './_auth.type';
import { AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth.token.service';

export class AuthDi extends DiCore {
  register(): void {
    this.registerController();
    this.registerSchema();
    this.registerService();
    this.registerTokenService();
  }

  private registerController() {
    container.registerSingleton<IAuthController>(
      EAuthKey.CONTROLLER,
      AuthController,
    );
  }

  private registerSchema() {
    container.registerSingleton<IAuthSchema>(EAuthKey.SCHEMA, AuthSchema);
  }

  private registerService() {
    container.registerSingleton<IAuthService>(EAuthKey.SERVICE, AuthService);
  }

  private registerTokenService() {
    container.registerSingleton<IAuthTokenService>(
      EAuthKey.TOKEN_SERVICE,
      AuthTokenService,
    );
  }
}

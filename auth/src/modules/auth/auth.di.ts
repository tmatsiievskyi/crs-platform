import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EAuthModule } from '@common/enums';
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
      EAuthModule.CONTROLLER,
      AuthController,
    );
  }

  private registerSchema() {
    container.registerSingleton<IAuthSchema>(EAuthModule.SCHEMA, AuthSchema);
  }

  private registerService() {
    container.registerSingleton<IAuthService>(EAuthModule.SERVICE, AuthService);
  }

  private registerTokenService() {
    container.registerSingleton<IAuthTokenService>(
      EAuthModule.TOKEN_SERVICE,
      AuthTokenService,
    );
  }
}

import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EAuthKey } from '@common/enums';
import { AuthController } from './auth.controller';
import { IAuthController, IAuthSchema, IAuthService } from './_auth.type';
import { AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';

export class AuthDi extends DiCore {
  register(): void {
    this.registerController();
    this.registerSchema();
    this.registerService();
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
}

import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EAuthKey } from '@common/enums';
import { AuthController } from './auth.controller';
import { IAuthController, IAuthSchema } from './_auth.type';
import { AuthSchema } from './auth.schema';

export class AuthDi extends DiCore {
  register(): void {
    this.registerController();
    this.registerSchema();
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
}

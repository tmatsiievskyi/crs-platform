import { container } from 'tsyringe';

import { DiCore } from '@core';
import { EAuthInject } from '@common/enums';
import { AuthController } from './auth.controller';
import { IAuthController } from './_auth.type';

export class AuthDi extends DiCore {
  register(): void {
    this.registerController();
  }

  private registerController() {
    container.registerSingleton<IAuthController>(
      EAuthInject.CONTROLLER,
      AuthController,
    );
  }
}
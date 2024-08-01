import { DiCore } from '@core';
import { container } from 'tsyringe';
import { ETokenInject, ITokenService } from './_types';
import { TokenService } from './token.service';

export class TokenDi extends DiCore {
  register(): void {
    this.registerService();
  }

  private registerService() {
    container.registerSingleton<ITokenService>(
      ETokenInject.SERVICE,
      TokenService,
    );
  }
}

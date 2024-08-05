import { ERefreshTokenKey } from '@common/enums';
import { DiCore } from '@core';
import { container } from 'tsyringe';
import { RefreshTokenRepository } from './refreshToken.repository';
import { RefreshTokenService } from './refreshToken.service';

export class RefreshTokenDi extends DiCore {
  register(): void {
    this.registerRepository();
    this.registerService();
  }

  private registerRepository() {
    container.registerSingleton(
      ERefreshTokenKey.REPOSITORY,
      RefreshTokenRepository,
    );
  }
  private registerService() {
    container.registerSingleton(ERefreshTokenKey.SERVICE, RefreshTokenService);
  }
}

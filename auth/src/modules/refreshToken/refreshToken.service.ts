import { ServiceCore } from '@core';
import {
  IRefreshTokenRepository,
  IRefreshTokenService,
  TCreateRefreshToken,
} from './_refreshToken.type';
import { inject, injectable } from 'tsyringe';
import { ERefreshTokenKey } from '@common/enums';

@injectable()
export class RefreshTokenService
  extends ServiceCore
  implements IRefreshTokenService
{
  constructor(
    @inject(ERefreshTokenKey.REPOSITORY)
    protected readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {
    super();
  }

  create(data: TCreateRefreshToken) {
    return this.refreshTokenRepository.create(data);
  }
}

import { ServiceCore } from '@core';
import {
  IRefreshTokenRepository,
  IRefreshTokenService,
  TCreateRefreshToken,
} from './_refreshToken.type';
import { inject, injectable } from 'tsyringe';
import { ERefreshTokenModule } from '@common/enums';
import { TDeleteResult } from '@common/types';

@injectable()
export class RefreshTokenService
  extends ServiceCore
  implements IRefreshTokenService
{
  constructor(
    @inject(ERefreshTokenModule.REPOSITORY)
    protected readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {
    super();
  }

  create(data: TCreateRefreshToken) {
    return this.refreshTokenRepository.create(data);
  }

  deleteByUserId(userId: number): Promise<TDeleteResult> {
    return this.refreshTokenRepository.deleteByUserId(userId);
  }
}

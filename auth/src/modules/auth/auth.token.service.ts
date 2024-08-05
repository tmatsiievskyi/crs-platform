import { EConfigKey, ERefreshTokenKey, ETokenTypes } from '@common/enums';
import { Crypting, DateUtil } from '@common/utils';
import { IJwtConfig } from '@config/_types';
import { ServiceCore } from '@core';
import { IRefreshTokenService } from '@modules/refreshToken/_refreshToken.type';
import { ETokenInject, ITokenService } from '@providers/token';
import { inject, injectable } from 'tsyringe';
import { IAuthTokenService } from './_auth.type';
import { TUsers } from '@modules/users/_users.type';

@injectable()
export class AuthTokenService extends ServiceCore implements IAuthTokenService {
  constructor(
    @inject(EConfigKey.JWT) private readonly jwtConfig: IJwtConfig,
    @inject(ETokenInject.SERVICE) private readonly tokenService: ITokenService,
    @inject(ERefreshTokenKey.SERVICE)
    private readonly refreshTokenService: IRefreshTokenService,
  ) {
    super();
  }

  generateAccessToken(userId: number, payload: Partial<TUsers>) {
    const jti = Crypting.generateUuid();
    const expiresIn = DateUtil.parseStringToMs(
      this.jwtConfig.accessToken.expiresIn,
    );

    return this.tokenService.signJwt(
      { ...payload, jti, sub: String(userId), typ: ETokenTypes.SIGNIN },
      this.jwtConfig.accessToken.secret,
      { expiresIn },
    );
  }

  async generateRefreshToken(userId: number) {
    const jti = Crypting.generateUuid();
    const expiresIn = DateUtil.parseStringToMs(
      this.jwtConfig.refreshToken.expiresIn,
    );
    const expiresAt = DateUtil.addMillisecondToDate(new Date(), expiresIn);

    const [refreshToken] = await Promise.all([
      this.tokenService.signJwt(
        { sub: String(userId), jti, typ: ETokenTypes.SIGNIN },
        this.jwtConfig.refreshToken.secret,
        { expiresIn },
      ),
      this.refreshTokenService.create({ userId, jti, expiresAt }),
    ]);

    return refreshToken;
  }
}

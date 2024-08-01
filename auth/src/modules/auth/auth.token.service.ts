import { EConfigKey, ETokenTypes } from '@common/enums';
import { Crypting, DateUtil } from '@common/utils';
import { IJwtConfig } from '@config/_types';
import { ServiceCore } from '@core';
import { ETokenInject, ITokenService } from '@providers/token';
import { inject } from 'tsyringe';

export class AuthTokenService extends ServiceCore {
  constructor(
    @inject(EConfigKey.JWT) private readonly jwtConfig: IJwtConfig,
    @inject(ETokenInject.SERVICE) private readonly tokenService: ITokenService,
  ) {
    super();
  }

  generateAccessToken(userId: number, payload: TUserPayload) {
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
}

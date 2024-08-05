import { ServiceCore } from '@core';
import { IAuthService, IAuthTokenService, TSignInBody } from './_auth.type';
import { inject, injectable } from 'tsyringe';
import { TTokenPayload } from '@common/types';
import { EAuthKey, ETokenTypes, EUsersKey } from '@common/enums';
import {
  IUsersService,
  IUsersValidatorService,
  TUsers,
} from '@modules/users/_users.type';

@injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(EUsersKey.SERVICE) protected readonly usersService: IUsersService,
    @inject(EUsersKey.VALIDATION_SERVICE)
    protected readonly userValidationService: IUsersValidatorService,
    @inject(EAuthKey.TOKEN_SERVICE)
    private readonly authTokenService: IAuthTokenService,
  ) {
    super();
  }

  async handleSignIn({ password, email }: TSignInBody): Promise<TTokenPayload> {
    const user = await this.usersService.findByEmail(email);

    await this.userValidationService.checkCredentials(user, password);

    return this.getAuthTokens(user!);
  }

  private async getAuthTokens(user: TUsers) {
    const { id, role } = user;
    const [accessToken, refreshToken] = await Promise.all([
      this.authTokenService.generateAccessToken(id, { id, role }),
      this.authTokenService.generateRefreshToken(id),
    ]);
    return {
      type: ETokenTypes.SIGNIN,
      accessToken,
      refreshToken,
    };
  }
}

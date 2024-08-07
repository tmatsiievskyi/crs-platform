import { ServiceCore } from '@core';
import {
  IAuthService,
  IAuthTokenService,
  TSignInBody,
  TSignUpBody,
} from './_auth.type';
import { inject, injectable } from 'tsyringe';
import { TTokenPayload } from '@common/types';
import {
  EAuthKey,
  EHttpStatusCode,
  EMessageCode,
  ETokenTypes,
  EUsersKey,
} from '@common/enums';
import {
  IUsersService,
  IUsersValidatorService,
  TUsers,
} from '@modules/users/_users.type';
import { Crypting, StringUtil } from '@common/utils';
import { exceptionsMessages } from '@common/messages';
import { ELoggerInject, ILoggerService } from '@providers/logger';

@injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(EUsersKey.SERVICE) protected readonly usersService: IUsersService,
    @inject(EUsersKey.VALIDATION_SERVICE)
    protected readonly userValidationService: IUsersValidatorService,
    @inject(EAuthKey.TOKEN_SERVICE)
    private readonly authTokenService: IAuthTokenService,
    @inject(ELoggerInject.SERVICE) protected readonly logger: ILoggerService,
  ) {
    super();
  }

  async handleSignIn({ password, email }: TSignInBody): Promise<TTokenPayload> {
    const user = await this.usersService.findByEmail(email);

    await this.userValidationService.checkCredentials(user, password);

    return this.getAuthTokens(user!);
  }

  async handleSignUp({ email, password, firstName, lastName }: TSignUpBody) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw this.handleError({
        message: StringUtil.replace(exceptionsMessages.alreadyExists, {
          entity: 'User',
          value: `email: ${email}`,
        }),
        code: EHttpStatusCode.BAD_REQUEST,
        messageCode: EMessageCode.BAD_REQUEST,
      });
    }

    const hashedPassword = await Crypting.hashPassword(password);
    const createdUser = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    this.log(`Registered user with email: ${createdUser?.email}`);
    return 'sign-up111';
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

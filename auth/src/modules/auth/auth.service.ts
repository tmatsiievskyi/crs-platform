import { ServiceCore } from '@core';
import {
  IAuthService,
  IAuthTokenService,
  TSignInBody,
  TSignUpBody,
} from './_auth.type';
import { inject, injectable } from 'tsyringe';
import { TTokenPayload, TUsers } from '@common/types';
import {
  EAuthModule,
  EHttpStatusCode,
  EMessageCode,
  ERefreshTokenModule,
  ETokenTypes,
  EUsersModule,
} from '@common/enums';
import {
  IUsersService,
  IUsersValidatorService,
} from '@modules/users/_users.type';
import { Crypting, StringUtil } from '@common/utils';
import { exceptionsMessages } from '@common/messages';
import { ELoggerInject, ILoggerService } from '@providers/logger';
import { IRefreshTokenService } from '@modules/refreshToken/_refreshToken.type';

@injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(EUsersModule.SERVICE)
    protected readonly usersService: IUsersService,
    @inject(EUsersModule.VALIDATION_SERVICE)
    protected readonly userValidationService: IUsersValidatorService,
    @inject(EAuthModule.TOKEN_SERVICE)
    private readonly authTokenService: IAuthTokenService,
    @inject(ELoggerInject.SERVICE) protected readonly logger: ILoggerService,
    @inject(ERefreshTokenModule.SERVICE)
    private readonly refreshTokenService: IRefreshTokenService,
  ) {
    super();
  }

  async handleSignIn({ password, email }: TSignInBody): Promise<TTokenPayload> {
    const user = await this.usersService.findByEmail(email);

    await this.userValidationService.checkCredentials(user, password);

    this.log(`User with id  ${user?.id} just sign-in`);
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
      emailVerified: false,
    });

    await this.sendVerifyCodeByEmail(createdUser!);

    this.log(`Sign-up user with email: ${createdUser?.email}`);
    return 'sign-up'; // TODO: finish
  }

  async handleSignOut(userId: number) {
    const data = await this.refreshTokenService.deleteByUserId(userId);

    if (!data.numDeletedRows) {
      throw this.handleError({
        message: StringUtil.replace(exceptionsMessages.notDeleted, {
          entity: 'refresh_token',
        }),
        code: EHttpStatusCode.CONFLICT,
        messageCode: EMessageCode.CONFLICT,
      });
    }
    this.log(`User with id  ${userId} just signed-out`);
    return 'ok';
  }

  private async sendVerifyCodeByEmail(user: TUsers) {
    this.userValidationService.checkEmailIsNotEmpty(user);
    this.userValidationService.checkEmailIsNotVerified(user);
  }

  private async getAuthTokens(user: TUsers) {
    const { id, role, email } = user;
    const [accessToken, refreshToken] = await Promise.all([
      this.authTokenService.generateAccessToken(id, {
        id,
        role,
        email,
      }),
      this.authTokenService.generateRefreshToken(id),
    ]);
    return {
      type: ETokenTypes.BEARER,
      accessToken,
      refreshToken,
    };
  }
}

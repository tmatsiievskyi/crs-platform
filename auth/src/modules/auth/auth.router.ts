import { inject, injectable } from 'tsyringe';
import { EAuthInject, EAuthPaths } from '@common/enums';
import { RouterCore } from '@core';
import { IAuthController } from './_auth.type';

@injectable()
export class AuthRouter extends RouterCore {
  constructor(
    @inject(EAuthInject.CONTROLLER)
    private readonly controller: IAuthController,
  ) {
    super();

    this.init();
  }

  protected init() {
    this.router.post(EAuthPaths.SIGNIN, this.controller.signIn);
    this.router.post(EAuthPaths.SIGNUP, this.controller.signUp);
    this.router.post(EAuthPaths.SIGNOUT, this.controller.signOut);

    this.router.post(
      EAuthPaths.FORGOT_PASSWORD_EMAIL,
      this.controller.forgotPasswordByEmail,
    );
    this.router.post(
      EAuthPaths.FORGOT_PASSWORD_EMAIL_RESET,
      this.controller.resetPasswordByEmail,
    );

    this.router.get(EAuthPaths.EMAIL_VERIFY, this.controller.verifyEmailByCode);
    this.router.get(
      EAuthPaths.EMAIL_VERIFY_CODE,
      this.controller.sendVerifyCodeByEmail,
    );

    this.router.post(EAuthPaths.REFRESH_TOKEN, this.controller.refreshToken);
  }
}

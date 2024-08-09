import { inject, injectable } from 'tsyringe';
import { EAuthModule, EAuthPaths, EMiddlewareKey } from '@common/enums';
import { RouterCore } from '@core';
import { IAuthController, IAuthSchema } from './_auth.type';
import { IMiddleware } from '@common/types';

@injectable()
export class AuthRouter extends RouterCore {
  constructor(
    @inject(EAuthModule.CONTROLLER)
    private readonly controller: IAuthController,
    @inject(EAuthModule.SCHEMA)
    private readonly schema: IAuthSchema,
    @inject(EMiddlewareKey.USER_SESSION)
    private readonly userSessionMiddleware: IMiddleware,
    @inject(EMiddlewareKey.VALIDATE)
    private readonly validateMiddleware: IMiddleware,
    @inject(EMiddlewareKey.AUTH)
    private readonly authMiddleware: IMiddleware,
  ) {
    super();

    this.init();
  }

  protected init() {
    this.router.post(
      EAuthPaths.SIGNIN,
      this.userSessionMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.signIn()),
      this.controller.signIn,
    );
    this.router.post(
      EAuthPaths.SIGNUP,
      this.validateMiddleware.handler(this.schema.signUp()),
      this.controller.signUp,
    );
    this.router.post(
      EAuthPaths.SIGNOUT,
      this.authMiddleware.handler(),
      this.controller.signOut,
    );

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

import { ControllerCore } from '@core';
import {
  IAuthController,
  IAuthService,
  TAuthForgotPasswordReq,
  TAuthRefreshTokenReq,
  TAuthResetPasswordByEmailReq,
  TAuthSignInReq,
  TAuthSignOutReq,
  TAuthSignUpReq,
  TAuthVerifyEmailReq,
} from './_auth.type';
import { TNext, TRequest, TResponse } from '@common/types';
import { NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { EAuthModule, EConfigKey } from '@common/enums';
import { IAppConfig, IJwtConfig } from '@config/_types';
import { AuthTokenDto } from './auth.token.dto';
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '@common/constants';

@injectable()
export class AuthController extends ControllerCore implements IAuthController {
  constructor(
    @inject(EConfigKey.APP) protected readonly appConfig: IAppConfig,
    @inject(EConfigKey.JWT) protected readonly jwtConfig: IJwtConfig,
    @inject(EAuthModule.SERVICE) protected readonly service: IAuthService,
  ) {
    super();
  }

  signIn = async (
    { body, userSession }: TAuthSignInReq,
    res: TResponse,
    next: TNext,
  ) => {
    try {
      const dataInit = await this.service.handleSignIn(body, {
        userSession,
      });
      this.storeTokenInCookie(res, COOKIE_ACCESS_TOKEN, dataInit.accessToken);
      this.storeTokenInCookie(res, COOKIE_REFRESH_TOKEN, dataInit.refreshToken);

      const data = this.mapDataToDto(dataInit, {
        cls: AuthTokenDto,
      });

      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };
  signUp = async (
    { body }: TAuthSignUpReq,
    res: TResponse,
    next: TNext,
  ): Promise<void> => {
    try {
      const data = await this.service.handleSignUp(body);
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };

  signOut = async (
    { user }: TAuthSignOutReq,
    res: TResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = user;

      await this.service.handleSignOut(id);
      this.removeDataFromCookie(res, COOKIE_ACCESS_TOKEN);
      this.removeDataFromCookie(res, COOKIE_REFRESH_TOKEN);

      return this.sendJSON(res, 'ok');
    } catch (error) {
      next(error);
    }
  };

  forgotPasswordByEmail = async (
    _req: TAuthForgotPasswordReq,
    res: TResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = { message: 'forgot password' };
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    _req: TAuthRefreshTokenReq,
    res: TResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = { message: 'refresh token' };
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };
  resetPasswordByEmail = async (
    _req: TAuthResetPasswordByEmailReq,
    res: TResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = { message: 'reset password' };
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };
  sendVerifyCodeByEmail = async (
    _req: TRequest,
    res: TResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = { message: 'verify email' };
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };
  verifyEmailByCode = async (
    _req: TAuthVerifyEmailReq,
    res: TResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = { message: 'verify email' };
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };
}

import { ControllerCore } from '@core';
import {
  IAuthController,
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
import { EConfigKey } from '@common/enums';
import { IJwtConfig } from '@config/_types';

@injectable()
export class AuthController extends ControllerCore implements IAuthController {
  constructor(
    @inject(EConfigKey.JWT) protected readonly jwtConfig: IJwtConfig,
  ) {
    super();
  }

  signIn = async (_req: TAuthSignInReq, res: TResponse, next: TNext) => {
    try {
      const data = { message: 'sign-in' };

      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };
  signUp = async (
    _req: TAuthSignUpReq,
    res: TResponse,
    next: TNext,
  ): Promise<void> => {
    try {
      const data = { message: 'sign-up' };
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };

  signOut = async (
    _req: TAuthSignOutReq,
    res: TResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = { message: 'sign-out' };
      return this.sendJSON(res, data);
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

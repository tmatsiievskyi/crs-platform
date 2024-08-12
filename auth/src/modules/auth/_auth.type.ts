import {
  TContext,
  TJsonSchemaOptions,
  TNext,
  TRequest,
  TResponse,
  TTokenPayload,
  TUsers,
} from '@common/types';
//Structure related
export interface IAuthController {
  signIn(req: TAuthSignInReq, res: TResponse, next: TNext): Promise<void>;
  signUp(req: TAuthSignUpReq, res: TResponse, next: TNext): Promise<void>;
  signOut(req: TAuthSignOutReq, res: TResponse, next: TNext): Promise<void>;
  forgotPasswordByEmail(
    req: TAuthForgotPasswordReq,
    res: TResponse,
    next: TNext,
  ): Promise<void>;
  refreshToken(
    req: TAuthRefreshTokenReq,
    res: TResponse,
    next: TNext,
  ): Promise<void>;
  resetPasswordByEmail(
    req: TAuthResetPasswordByEmailReq,
    res: TResponse,
    next: TNext,
  ): Promise<void>;
  sendVerifyCodeByEmail(
    req: TRequest,
    res: TResponse,
    next: TNext,
  ): Promise<void>;
  verifyEmailByCode(
    req: TAuthVerifyEmailReq,
    res: TResponse,
    next: TNext,
  ): Promise<void>;
}

export interface IAuthService {
  handleSignIn(data: TSignInBody, ctx?: TAuthContext): Promise<TTokenPayload>;
  handleSignUp(data: TSignUpBody, ctx?: TAuthContext): Promise<string>;
  handleSignOut(userId: number): Promise<string>;
}

export interface IAuthTokenService {
  generateAccessToken(
    userId: number,
    payload: Partial<TUsers>,
  ): Promise<string>;
  generateRefreshToken(userId: number): Promise<string>;
}

export interface IAuthSchema {
  signIn(): TJsonSchemaOptions;
  signUp(): TJsonSchemaOptions;
}
// ---
// Request related
export type TAuthContext = TContext;
export type TSignInBody = { email: string; password: string };
export type TSignUpBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type TForgotPasswordBody = { email: string };
export type TRefreshTokenBody = { refreshToken: string };
export type TResetPasswordByEmailBody = TForgotPasswordBody & {
  code: string;
  password: string;
};
export type TVerifyEmailBody = {
  code: string;
  email: string;
};

export type TAuthSignInReq = TRequest<unknown, unknown, TSignInBody>;
export type TAuthSignUpReq = TRequest<unknown, unknown, TSignUpBody>;
export type TAuthSignOutReq = TRequest;
export type TAuthForgotPasswordReq = TRequest<
  unknown,
  unknown,
  TForgotPasswordBody
>;
export type TAuthRefreshTokenReq = TRequest<
  unknown,
  unknown,
  TRefreshTokenBody
>;
export type TAuthResetPasswordByEmailReq = TRequest<
  unknown,
  unknown,
  TResetPasswordByEmailBody
>;
export type TAuthVerifyEmailReq = TRequest<unknown, unknown, TVerifyEmailBody>;

import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '@common/constants';
import { EHttpStatusCode } from '@common/enums';
import {
  TCookieParam,
  TDataForCookie,
  TRespCtx,
  TResponse,
  TTokenPayload,
} from '@common/types';
import { DateUtil } from '@common/utils';
import { IAppConfig, IJwtConfig } from '@config/_types';

export class ControllerCore {
  protected readonly appConfig!: IAppConfig;
  protected readonly jwtConfig!: IJwtConfig;

  protected sendJSON<T>(res: TResponse, data?: T, ctx?: TRespCtx) {
    res.status(ctx?.status || EHttpStatusCode.OK).json(data ? { data } : null);
  }

  protected storeDataInCookie(res: TResponse, data: TDataForCookie) {
    res.cookie(data.name, data.value, { ...data.options });
  }

  protected storeTokenInCookie<T extends TTokenPayload>(
    res: TResponse,
    authTokens: Partial<T>,
    options?: Partial<TCookieParam>,
  ) {
    const params = this.getCookieParam(options);
    const maxAge = this.getCookieMaxAge(params);

    res.cookie(COOKIE_ACCESS_TOKEN, authTokens.accessToken, {
      domain: params.domain || '',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',

      ...maxAge,
    });

    res.cookie(COOKIE_REFRESH_TOKEN, authTokens.refreshToken, {
      domain: params.domain || '',
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
      ...maxAge,
    });
  }

  private checkConfig() {
    if (!this.appConfig || this.jwtConfig) {
      throw new Error('Missing jwt or auth config');
    }
  }

  private getCookieParam(
    options?: Partial<TCookieParam>,
  ): Partial<TCookieParam> {
    this.checkConfig();

    return {
      expiresIn: this.jwtConfig.refreshToken.expiresIn,
      domain: this.appConfig.domain,
      ...options,
    };
  }

  private getCookieMaxAge(options: Partial<TCookieParam>) {
    if (!options.maxAge) {
      return { maxAge: undefined };
    }

    const maxAge = DateUtil.parseStringToMs(options.maxAge || '');

    return { maxAge: maxAge };
  }
}

import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '@common/constants';
import { EHttpStatusCode } from '@common/enums';
import {
  TCookieParam,
  TDataForCookie,
  TMappingParams,
  TRespCtx,
  TResponse,
  TTokenPayload,
} from '@common/types';
import { DateUtil, MappingUtil } from '@common/utils';
import { IAppConfig, IJwtConfig } from '@config/_types';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer';

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
      secure: this.appConfig.env === 'development' ? false : true,
      httpOnly: true,
      sameSite: 'lax',
      ...maxAge,
    });

    res.cookie(COOKIE_REFRESH_TOKEN, authTokens.refreshToken, {
      domain: params.domain || '',
      secure: this.appConfig.env === 'development' ? false : true,
      sameSite: 'lax',
      httpOnly: true,
      ...maxAge,
    });
  }

  protected mapDataToDto<T extends Record<string, any>, U>(
    dataIn: U | U[],
    { cls, options }: Omit<TMappingParams<T, U>, 'data'>,
  ) {
    const dataOut = this.mapToDtoWithClass(dataIn, options, cls);

    //TODO: add page logic

    return dataOut;
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

  private mapToDtoWithClass<V, T extends Record<string, unknown>>(
    dataIn: V | V[],
    options: ClassTransformOptions,
    cls?: ClassConstructor<T>,
  ): T | T[] {
    if (cls) {
      return MappingUtil.objToDto({
        cls,
        data: dataIn,
        options,
      });
    }

    return dataIn as T | T[];
  }
}

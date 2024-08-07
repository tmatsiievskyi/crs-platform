import { EHttpStatusCode } from '@common/enums';
import { MissingConfigOptionException } from '@common/exceptions/http.exception';
import { exceptionsMessages } from '@common/messages';
import {
  TCookieOptions,
  TDataForCookie,
  TMappingParams,
  TRespCtx,
  TResponse,
} from '@common/types';
import { DateUtil, MappingUtil, StringUtil } from '@common/utils';
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

  protected storeTokenInCookie(
    res: TResponse,
    name: keyof IJwtConfig,
    token: string,
    options?: Partial<TCookieOptions>,
  ) {
    const params = this.getJwtCookieParam(name, options);
    res.cookie(name, token, { ...params });
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
    if (!this.appConfig || !this.jwtConfig) {
      throw new MissingConfigOptionException(
        StringUtil.replace(exceptionsMessages.missigOption, {
          option: 'appConfig or jwtConfig',
        }),
      );
    }
  }

  private getJwtCookieParam(name: keyof IJwtConfig, options?: TCookieOptions) {
    this.checkConfig();

    return {
      maxAge: DateUtil.parseStringToMs(this.jwtConfig[name].expiresIn),
      domain: this.appConfig.domain,
      httpOnly: true,
      secure:
        options?.secure || this.appConfig.env === 'development' ? false : true,
      ...options,
    };
  }

  private mapToDtoWithClass<V, T extends Record<string, unknown>>(
    dataIn: V | V[],
    options?: ClassTransformOptions,
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

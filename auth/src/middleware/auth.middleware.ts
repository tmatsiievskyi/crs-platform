import { COOKIE_ACCESS_TOKEN } from '@common/constants';
import { EConfigKey, ETokenTypes } from '@common/enums';
import { TokenNotProvidedException } from '@common/exceptions';
import { TRequest, TResponse, TNext } from '@common/types';
import { IJwtConfig } from '@config/_types';
import { MiddlewareCore } from '@core';
import { ETokenProvider, ITokenService } from '@providers/token';
import { inject, singleton } from 'tsyringe';

@singleton()
export class AuthMiddleware extends MiddlewareCore {
  constructor(
    @inject(ETokenProvider.SERVICE)
    private readonly tokenService: ITokenService,
    @inject(EConfigKey.JWT) private readonly jwtConfig: IJwtConfig,
  ) {
    super();
  }

  handler() {
    return async (req: TRequest, _res: TResponse, next: TNext) => {
      const token =
        this.getTokenFromCookies(req) || this.getTokenFromHeaders(req);

      if (!token) {
        return next(new TokenNotProvidedException());
      }

      try {
        const { id, role, email } =
          await this.tokenService.verifyJwt<TAccessTokenPayload>(
            token,
            this.jwtConfig.accessToken.secret,
          );
        req.user = { id, role, email } as const;

        return next();
      } catch (error) {
        next(error);
      }

      return next();
    };
  }

  private getTokenFromHeaders(req: TRequest) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === ETokenTypes.BEARER && token ? token : null;
  }

  private getTokenFromCookies(req: TRequest) {
    if (req.cookies && COOKIE_ACCESS_TOKEN in req.cookies) {
      return req.cookies.accessToken as string;
    }

    return null;
  }
}

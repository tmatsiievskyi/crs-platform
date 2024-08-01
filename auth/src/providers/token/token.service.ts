import {
  TokenExpiredExceptions,
  TokenVerifyExceptions,
} from '@common/exceptions/http.exception';
import { DateUtil } from '@common/utils';
import {
  createDecoder,
  createSigner,
  createVerifier,
  DecoderOptions,
  SignerOptions,
  TokenError,
} from 'fast-jwt';
import { ITokenService } from './_types';

export class TokenService implements ITokenService {
  decodeJwt<T>(token: string, options?: Partial<DecoderOptions>) {
    return createDecoder(options)(token) as T;
  }

  async signJwt<T>(
    payload: T,
    secret: string,
    options?: Partial<SignerOptions>,
  ) {
    const sign = createSigner({ ...options, key: async () => secret });

    try {
      return await sign({ ...payload, iat: DateUtil.toUnix(new Date()) });
    } catch (error) {
      throw new TokenVerifyExceptions();
    }
  }

  async verifyJwt<T>(token: string, secret: string) {
    const verify = createVerifier({ key: async () => secret });

    try {
      return (await verify(token)) as T;
    } catch (error) {
      if (error && error?.code === TokenError.codes.expired) {
        throw new TokenExpiredExceptions();
      }

      throw new TokenVerifyExceptions();
    }
  }
}

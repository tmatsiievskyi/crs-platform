import { ServiceCore } from '@core';
import { IAuthService, TSignInBody } from './_auth.type';
import { injectable } from 'tsyringe';
import { TTokenPayload } from '@common/types';

@injectable()
export class AuthService extends ServiceCore implements IAuthService {
  async handleSignIn(_data: TSignInBody): Promise<TTokenPayload> {
    return {};
  }
}

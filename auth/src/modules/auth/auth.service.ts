import { ServiceCore } from '@core';
import { IAuthService, TSignInBody } from './_auth.type';
import { inject, injectable } from 'tsyringe';
import { TTokenPayload } from '@common/types';
import { EUsersKey } from '@common/enums';
import { IUsersService } from '@modules/users/_users.type';

@injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(EUsersKey.SERVICE) protected readonly usersService: IUsersService,
  ) {
    super();
  }

  async handleSignIn(_data: TSignInBody): Promise<TTokenPayload> {
    return {};
  }
}

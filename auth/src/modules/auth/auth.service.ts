import { ServiceCore } from '@core';
import { IAuthService, TSignInBody } from './_auth.type';
import { inject, injectable } from 'tsyringe';
import { TTokenPayload } from '@common/types';
import { EUsersKey } from '@common/enums';
import {
  IUsersService,
  IUsersValidatorService,
} from '@modules/users/_users.type';

@injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(EUsersKey.SERVICE) protected readonly usersService: IUsersService,
    @inject(EUsersKey.VALIDATION_SERVICE)
    protected readonly userValidationService: IUsersValidatorService,
  ) {
    super();
  }

  async handleSignIn({ password, email }: TSignInBody): Promise<TTokenPayload> {
    const user = await this.usersService.findByEmail(email);

    await this.userValidationService.checkCredentials(user, password);
    console.log(user);

    return {};
  }
}

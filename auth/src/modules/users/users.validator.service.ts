import { ValidatorCore } from '@core';
import { IUsersValidatorService, TUserQuery } from './_users.type';

export class UsersValidationService
  extends ValidatorCore
  implements IUsersValidatorService
{
  async checkCredentials(user?: TUserQuery, _password?: string): Promise<void> {
    if (!user) this.throwException('invalidCredentials');
  }
}

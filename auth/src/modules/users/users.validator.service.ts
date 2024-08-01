import { ValidatorCore } from '@core';
import { IUsersValidatorService, TUserQuery } from './_users.type';
import { validationMessages } from '@common/messages';
import { Crypting } from '@common/utils';

export class UsersValidationService
  extends ValidatorCore
  implements IUsersValidatorService
{
  async checkCredentials(user?: TUserQuery, password?: string): Promise<void> {
    if (!user) {
      this.throwException(
        'invalidCredentials',
        validationMessages.invalidCredentials,
      );
    }

    const valid = await Crypting.comparePasswords(user?.password, password);

    if (!valid) {
      this.throwException(
        'invalidCredentials',
        validationMessages.invalidCredentials,
      );
    }
  }
}

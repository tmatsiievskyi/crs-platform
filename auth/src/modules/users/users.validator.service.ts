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

  checkEmailIsNotEmpty(user?: TUserQuery) {
    if (!user || !user.email) {
      this.throwException('user', validationMessages.emptyEmail);
    }
  }

  checkEmailIsNotVerified(user?: TUserQuery) {
    if (!user || user.emailVerified) {
      this.throwException('user', validationMessages.emailAlreadyConfirmed);
    }
  }
}

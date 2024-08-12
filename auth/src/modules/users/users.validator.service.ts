import { ValidatorCore } from '@core';
import { IUsersValidatorService, TUserQuery } from './_users.type';
import { validationMessages } from '@common/messages';
import { Crypting } from '@common/utils';
import { TUsers } from '@common/types';

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

  checkNewPassword(oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      this.throwException('newPassword', validationMessages.samePassword);
    }
  }

  async checkOldPassword(user?: Partial<TUsers>, password?: string) {
    const isValid = await Crypting.comparePasswords(user?.password, password);

    if (!isValid) {
      this.throwException('oldPassword', validationMessages.oldPasswordWrong);
    }
  }
}

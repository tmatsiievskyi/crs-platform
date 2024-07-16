import { ServiceCore } from '@core';
import { IUsersDao, IUsersService, TFullUser, TUserQuery } from './_users.type';
import { inject, injectable } from 'tsyringe';
import { EUsersKey } from '@common/enums';

@injectable()
export class UsersService extends ServiceCore implements IUsersService {
  constructor(@inject(EUsersKey.DAO) protected readonly dao: IUsersDao) {
    super();
  }

  getList(_query: TUserQuery): Promise<TFullUser[]> {
    return this.dao.all();
  }
}

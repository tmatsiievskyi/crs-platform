import { ServiceCore } from '@core';
import { IUsersRepository, IUsersService, TUserQuery } from './_users.type';
import { inject, injectable } from 'tsyringe';
import { EUsersKey } from '@common/enums';

@injectable()
export class UsersService extends ServiceCore implements IUsersService {
  constructor(
    @inject(EUsersKey.REPOSITORY)
    protected readonly usersRepository: IUsersRepository,
  ) {
    super();
  }

  getList(_query: TUserQuery) {
    return this.usersRepository.all();
  }

  getById(id: number) {
    return this.usersRepository.findById(id);
  }
}

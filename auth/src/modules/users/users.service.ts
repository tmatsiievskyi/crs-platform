import { ServiceCore } from '@core';
import {
  IUsersRepository,
  IUsersService,
  TCreateUser,
  TUserQuery,
} from './_users.type';
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

  findAll(_query: TUserQuery) {
    return this.usersRepository.all();
  }

  findById(id: number) {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  create(data: TCreateUser) {
    //TODO: add type
    return this.usersRepository.create(data);
  }
}

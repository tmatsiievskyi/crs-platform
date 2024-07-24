import { RepositoryCore } from '@core';
import { DB } from '@db';
import { singleton } from 'tsyringe';

@singleton()
export class UsersRepository extends RepositoryCore {
  protected tabelName: keyof DB = 'users';
}

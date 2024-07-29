import { RepositoryCore } from '@core';
import { DB } from '@db';
import { singleton } from 'tsyringe';

@singleton()
export class UsersRepository extends RepositoryCore {
  protected tabelName: keyof DB = 'users';

  protected findByEmail(email: string) {
    return this.tabel.where('email', '=', email).selectAll().executeTakeFirst();
  }
}

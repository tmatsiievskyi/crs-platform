import { RepositoryCore } from '@core';
import { DB } from '@db';
import { singleton } from 'tsyringe';

@singleton()
export class UsersRepository extends RepositoryCore {
  protected tabelName: keyof DB;

  constructor() {
    const tableName = 'users';
    super(tableName);
    this.tabelName = tableName;
  }

  protected findByEmail(email: string) {
    return this.db
      .selectFrom(this.tabelName)
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();
  }
}

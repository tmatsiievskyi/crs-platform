import { DaoCore } from '@core';
import { singleton } from 'tsyringe';
// import { IUsersDao } from './_users.type';
// import { Knex } from 'knex';

@singleton()
export class UsersDao extends DaoCore {
  protected tabelName: string = 'users';
}

import { db as database } from '@db/database';
import type { DB } from '@db';
import { InternalServerExceptions } from '@common/exceptions/http.exception';
import { DeleteResult } from 'kysely';
import { TInsertObject, TSelectObject, TUpdateObject } from '@common/types';

export class RepositoryCore {
  protected readonly tabelName: keyof DB;

  constructor(tableName: keyof DB) {
    this.tabelName = tableName;
  }

  protected get db() {
    if (!this.tabelName) {
      throw new Error(`Table with name: ${this.tabelName} does not exist`);
    }

    return database;
  }

  all() {
    return this.db.selectFrom(this.tabelName).selectAll().execute();
  }

  findById(id: number, data?: TSelectObject) {
    try {
      if (data) {
        const dbResp = this.db
          .selectFrom(this.tabelName)
          .where('id', '=', id)
          .select(data)
          .executeTakeFirst();
        return dbResp;
      } else {
        const dbResp = this.db
          .selectFrom(this.tabelName)
          .where('id', '=', id)
          .selectAll()
          .executeTakeFirst();
        return dbResp;
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(entity: TInsertObject): Promise<any> {
    try {
      return await this.db
        .insertInto(this.tabelName)
        .values(entity)
        .returningAll()
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async update(id: number, data: TUpdateObject) {
    try {
      return await this.db
        .updateTable(this.tabelName)
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.db
        .deleteFrom(this.tabelName)
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected handleError(_error: unknown) {
    return new InternalServerExceptions();
  }
}

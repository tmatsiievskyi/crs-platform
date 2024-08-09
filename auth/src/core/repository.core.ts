import { db as database } from '@db/database';
import type { DB } from '@db';
import { InternalServerExceptions } from '@common/exceptions/http.exception';
// import { TDeepPartial } from '@common/types';
import { InsertExpression } from 'kysely/dist/cjs/parser/insert-values-parser';
import { DeleteResult } from 'kysely';
// import { UpdateObjectExpression } from 'kysely/dist/cjs/parser/update-set-parser';

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

  // findById(id: number) {
  //   try {
  //     const dbResp = this.tabel
  //       .where('id', '=', id)
  //       .selectAll()
  //       .executeTakeFirst();
  //     return dbResp;
  //   } catch (error) {
  //     throw this.handleError(error);
  //   }
  // }

  async create(entity: InsertExpression<DB, keyof DB>): Promise<any> {
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

  // protected async update(
  //   value: UpdateObjectExpression<DB, keyof DB>,
  //   id: number,
  // ) {
  //   try {
  //     return await db
  //       .updateTable(this.tabelName)
  //       .set(value)
  //       .where('id', '=', id)
  //       .returningAll()
  //       .executeTakeFirstOrThrow();
  //   } catch (error) {
  //     throw this.handleError(error);
  //   }
  // }

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

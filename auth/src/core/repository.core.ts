import { db } from '@db/database';
import type { DB } from '@db';
import { InternalServerExceptions } from '@common/exceptions/http.exception';

export class RepositoryCore {
  protected readonly tabelName: keyof DB;

  constructor(tableName: keyof DB) {
    this.tabelName = tableName;
  }

  private get tabel() {
    if (!this.tabelName) {
      throw new Error(`Table with name: ${this.tabelName} does not exist`);
    }

    return db.selectFrom(this.tabelName);
  }

  public all() {
    const query = this.tabel;
    console.log(query);
    return query.selectAll().execute();
  }

  public findById(id: number) {
    try {
      const dbResp = this.tabel
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
      return dbResp;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(_error: unknown) {
    return new InternalServerExceptions();
  }
}

import { database } from 'src/data';

export class DaoCore {
  protected readonly tabelName: string;

  constructor(tableName: string) {
    this.tabelName = tableName;
  }

  private get tabel() {
    if (!this.tabelName) {
      throw new Error(`Table with name: ${this.tabelName} does not exist`);
    }

    return database(this.tabelName);
  }

  public all() {
    return this.tabel;
  }
}

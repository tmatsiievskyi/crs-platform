import { RepositoryCore } from '@core';
import { DB } from '@db';
import { singleton } from 'tsyringe';
import { IRefreshTokenRepository } from './_refreshToken.type';

@singleton()
export class RefreshTokenRepository
  extends RepositoryCore
  implements IRefreshTokenRepository
{
  protected tabelName: keyof DB;

  constructor() {
    const tableName = 'refresh_tokens';
    super(tableName);
    this.tabelName = tableName;
  }

  async deleteByUserId(userId: number) {
    if (!userId) throw new Error('UserId was not provided');

    try {
      return this.db
        .deleteFrom(this.tabelName)
        .where('userId', '=', userId)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

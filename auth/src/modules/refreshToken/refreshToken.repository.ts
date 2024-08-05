import { RepositoryCore } from '@core';
import { DB } from '@db';
import { singleton } from 'tsyringe';

@singleton()
export class RefreshTokenRepository extends RepositoryCore {
  protected tabelName: keyof DB = 'refresh_tokens';
}

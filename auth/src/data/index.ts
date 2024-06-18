import { TConfig } from '@config';
import Knex from 'knex';
import dbConfigs from './knexfile';

export const createDataProviders = (
  db: TConfig['db'],
  pg: TConfig['pg'],
  server: TConfig['server'],
) => ({
  db: Knex(dbConfigs[server.nodeEnv]),
});

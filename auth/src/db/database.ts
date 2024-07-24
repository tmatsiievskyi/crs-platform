import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import { config } from 'dotenv';
import { join } from 'node:path';
import { DB } from './_db.type';

config({
  path: join(
    process.cwd(),
    `.env${process?.env?.NODE_ENV ? `.${process?.env?.NODE_ENV}` : ''}`,
  ),
});

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT || 5432),
    min: Number(process.env.DATABASE_POOL_MIN || 1),
    max: Number(process.env.DATABASE_POOL_MAX || 10),
  }),
});

export const db = new Kysely<DB>({
  dialect,
});

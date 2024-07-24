import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`.execute(db);
}

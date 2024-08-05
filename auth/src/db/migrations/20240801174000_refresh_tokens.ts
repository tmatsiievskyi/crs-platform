import { DB_TABLE_REFRESH_TOKEN } from '@db/constants/table-name.const';
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable(DB_TABLE_REFRESH_TOKEN)
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('userId', 'integer', (col) =>
      col.references('users.id').onDelete('cascade').notNull(),
    )
    .addColumn('jti', 'varchar(36)', (col) => col.notNull().unique())
    .addColumn('isRevoked', 'boolean', (col) => col.defaultTo(false))
    .addColumn('ip', 'varchar(46)')
    .addColumn('os', 'text')
    .addColumn('browser', 'text')
    .addColumn('userAgent', 'text')
    .addColumn('expiresAt', 'timestamptz', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable(DB_TABLE_REFRESH_TOKEN).execute();
}

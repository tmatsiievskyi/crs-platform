import { EUsersRole } from '@common/enums';
import { DB_TABLE_USERS } from '@db/constants/table-name.const';
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createType('roles')
    .asEnum(Object.values(EUsersRole))
    .execute();

  await db.schema
    .createTable(DB_TABLE_USERS)
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('firstName', 'varchar(128)', (col) => col.notNull())
    .addColumn('lastName', 'varchar(128)', (col) => col.notNull())
    .addColumn('email', 'varchar(128)', (col) => col.unique().notNull())
    .addColumn('emailVerified', 'boolean', (col) =>
      col.defaultTo(false).notNull(),
    )
    .addColumn('password', 'varchar(256)', (col) => col.notNull())
    .addColumn('image', 'text')
    .addColumn('role', sql`roles`, (col) =>
      col.defaultTo(EUsersRole.USER).notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )

    .execute();

  await db.schema
    .createIndex('IDX_user_full_name')
    .on(DB_TABLE_USERS)
    .using(`gin(("firstName" || ' ' || "lastName") gin_trgm_ops)`)
    .execute();

  await db.schema
    .alterTable(DB_TABLE_USERS)
    .addCheckConstraint('CHK_email_min_length', sql`length(email) >= 6`)
    .execute();

  await db.schema
    .alterTable(DB_TABLE_USERS)
    .addCheckConstraint('CHK_password_min_length', sql`length(email) >= 8`)
    .execute();

  await db.schema
    .createIndex('IDX_users_created_at')
    .on(DB_TABLE_USERS)
    .column('created_at')
    .execute();

  await db.schema
    .createIndex('IDX_users_updated_at')
    .on(DB_TABLE_USERS)
    .column('updated_at')
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable(DB_TABLE_USERS).execute();
  await db.schema.dropType('roles').execute();
}

import { EUsersRole } from '@common/enums';
import { Kysely, sql } from 'kysely';

const TABLE_NAME = 'users';

export async function up(db: Kysely<any>) {
  await db.schema
    .createType('roles')
    .asEnum(Object.values(EUsersRole))
    .execute();

  await db.schema
    .createTable(TABLE_NAME)
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('firstName', 'varchar(128)')
    .addColumn('lastName', 'varchar(128)')
    .addColumn('email', 'varchar(128)', (col) => col.unique())
    .addColumn('emailVerified', 'boolean', (col) => col.defaultTo(false))
    .addColumn('password', 'varchar(256)')
    .addColumn('image', 'text')
    .addColumn('role', sql`roles`, (col) => col.defaultTo(EUsersRole.USER))
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )

    .execute();

  await db.schema
    .createIndex('IDX_user_full_name')
    .on(TABLE_NAME)
    .using(`gin(("firstName" || ' ' || "lastName") gin_trgm_ops)`)
    .execute();

  await db.schema
    .alterTable(TABLE_NAME)
    .addCheckConstraint('CHK_email_min_length', sql`length(email) >= 6`)
    .execute();

  await db.schema
    .alterTable(TABLE_NAME)
    .addCheckConstraint('CHK_password_min_length', sql`length(email) >= 8`)
    .execute();

  await db.schema
    .createIndex('IDX_users_created_at')
    .on(TABLE_NAME)
    .column('created_at')
    .execute();

  await db.schema
    .createIndex('IDX_users_updated_at')
    .on(TABLE_NAME)
    .column('updated_at')
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable(TABLE_NAME).execute();
  await db.schema.dropType('roles').execute();
}

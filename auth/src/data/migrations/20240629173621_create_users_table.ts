import type { Knex } from 'knex';

const TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema
      .createTable(TABLE_NAME, (table) => {
        table.uuid('id').defaultTo(knex.fn.uuid()).primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email').notNullable().unique();
        table.datetime('email_verified');
        table.string('password');
        table.text('image');
        table
          .timestamp('created_at')
          .notNullable()
          .defaultTo(knex.raw('now()'));
        table
          .timestamp('updated_at')
          .notNullable()
          .defaultTo(knex.raw('now()'));
      })
      .raw(
        `CREATE INDEX IDX_user_full_name ON "users" USING gin((first_name || ' ' || last_name) gin_trgm_ops)`,
      )
      .raw('CREATE INDEX IDX_users_created_at on roles(created_at)')
      .raw('CREATE INDEX IDX_users_updated_at on roles(updated_at)');
  } catch (error) {
    console.log(error);
  }
}

export async function down(knex: Knex): Promise<void> {
  try {
    await knex.schema.dropTable(TABLE_NAME);
  } catch (error) {
    console.log(error);
  }
}

import type { Knex } from 'knex';

const TABLE_NAME = 'accounts';

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema.createTable(TABLE_NAME, (table) => {
      table.uuid('id').defaultTo(knex.fn.uuid()).unique();
      table.uuid('user_id').notNullable();
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('provider_type');
      table.string('provider_id').unique();
      table.string('provider_account_id').unique();
      table.text('access_token');
      table.text('refresh_token');
      table.string('expires_at');
      table.string('token_type');
      table.string('scope');
      table.text('id_token');
      table.string('session_state');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
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

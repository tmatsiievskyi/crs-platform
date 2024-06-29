import type { Knex } from 'knex';

const TABLE_NAME = 'roles';

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema
      .createTable(TABLE_NAME, (table) => {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.boolean('active').notNullable();
        table
          .timestamp('created_at')
          .notNullable()
          .defaultTo(knex.raw('now()'));
        table
          .timestamp('updated_at')
          .notNullable()
          .defaultTo(knex.raw('now()'));
      })
      .raw('CREATE INDEX IDX_role_name on roles(name)')
      .raw('CREATE INDEX IDX_role_created_at on roles(created_at)')
      .raw('CREATE INDEX IDX_role_updated_at on roles(updated_at)');
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

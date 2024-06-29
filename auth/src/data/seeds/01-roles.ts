import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const TABLE_NAME = 'roles';

  try {
    await knex(TABLE_NAME).del();

    await knex(TABLE_NAME).insert([
      {
        name: 'user',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'super_admin',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

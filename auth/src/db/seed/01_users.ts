import { faker } from '@faker-js/faker';
import { Crypting } from '@common/utils/crypting.util';
import { EUsersRole } from '@common/enums';

export async function seed() {
  const TABLE_NAME = 'users';
  const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;

  if (!DEFAULT_PASSWORD) {
    throw new Error('Default password is not provided');
  }

  const users = await Promise.all(
    Array(1000)
      .fill(null)
      .map(async () => ({
        email: faker.internet.email().toLowerCase(),
        emailVerified: false,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: await Crypting.hashPassword(DEFAULT_PASSWORD),
        role: EUsersRole.USER,
      })),
  );

  return { data: users, tableName: TABLE_NAME };
}

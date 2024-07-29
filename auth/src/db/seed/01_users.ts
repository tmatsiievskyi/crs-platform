import { Kysely } from 'kysely';
import { faker } from '@faker-js/faker';
import { Crypting } from '@common/utils/crypting.util';
import { EUsersRole } from '@common/enums';

export function seed(db: Kysely<any>): Promise<any> {
  return new Promise((res, rej) => {
    const TABLE_NAME = 'users';
    console.log(process.env);
    const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD;

    if (!DEFAULT_PASSWORD) {
      return rej('Default password is not provided');
    }

    const users = Promise.all(
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

    res({ data: users, tableName: TABLE_NAME });
  });
}

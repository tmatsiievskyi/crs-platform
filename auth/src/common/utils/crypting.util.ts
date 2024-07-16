import {
  HASH_ENCODING,
  HASH_KEY_LENGTH,
  SALT_DEVIDER,
  SALT_LENGTH,
} from '@common/constants';
import { randomBytes, scrypt } from 'crypto';

export class Crypting {
  static hashPassword(password: string): Promise<string | null> {
    return new Promise((res, rej) => {
      if (!password) rej(null);

      const salt = randomBytes(SALT_LENGTH).toString('hex');

      scrypt(password, salt, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err) rej(err);

        return res(
          `${salt}${SALT_DEVIDER}${derivedKey.toString(HASH_ENCODING)}`,
        );
      });
    });
  }
}

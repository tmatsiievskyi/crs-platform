import {
  HASH_ENCODING,
  HASH_KEY_LENGTH,
  SALT_DEVIDER,
  SALT_LENGTH,
} from '@common/constants';
import { randomBytes, scrypt, scryptSync } from 'crypto';

export class Crypting {
  static hashPassword(password: string): Promise<string | null> {
    return new Promise((res, rej) => {
      if (!password) rej(null);

      const salt = randomBytes(SALT_LENGTH);

      scrypt(password, salt, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err) rej(err);

        return res(this.serializeHash(derivedKey, salt));
      });
    });
  }

  static serializeHash(hash: Buffer, salt: Buffer) {
    const saltString = salt.toString(HASH_ENCODING).split('=')[0];
    const hashString = hash.toString(HASH_ENCODING).split('=')[0];

    return `${saltString}${SALT_DEVIDER}${hashString}`;
  }

  static comparePasswords(hashedPassword: string, password: string) {
    return new Promise((res, rej) => {
      if (!hashedPassword || !password) {
        res(false);
      }

      const [salt, hash] = hashedPassword.split(SALT_DEVIDER);
      if (!salt || !hash) {
        return res(false);
      }

      const hashBuff = Buffer.from(hash, HASH_ENCODING);
    });
  }
}

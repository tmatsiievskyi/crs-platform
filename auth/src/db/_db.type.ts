import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Roles = 'admin' | 'super_admin' | 'user';

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Users {
  created_at: Generated<Timestamp>;
  email: string | null;
  emailVerified: Generated<boolean | null>;
  firstName: string | null;
  id: Generated<number>;
  image: string | null;
  lastName: string | null;
  password: string | null;
  role: Generated<Roles | null>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  users: Users;
}

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Roles = "admin" | "super_admin" | "user";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface RefreshTokens {
  browser: string | null;
  created_at: Generated<Timestamp>;
  expiresAt: Timestamp;
  id: Generated<number>;
  ip: string | null;
  isRevoked: Generated<boolean | null>;
  jti: string;
  os: string | null;
  updated_at: Generated<Timestamp>;
  userAgent: string | null;
  userId: number;
}

export interface Users {
  created_at: Generated<Timestamp>;
  email: string;
  emailVerified: Generated<boolean>;
  firstName: string;
  id: Generated<number>;
  image: string | null;
  lastName: string;
  password: string;
  role: Generated<Roles>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  refresh_tokens: RefreshTokens;
  users: Users;
}

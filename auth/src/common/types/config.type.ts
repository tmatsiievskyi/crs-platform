import { CookieOptions } from 'express';
import type { Schema } from 'joi';

export type TCors = {
  credentials: boolean;
  origin: string[];
};

export type TConfigSSL = {
  ca?: string;
  enabled?: boolean;
};

export type TJoiCtx = {
  schema: Schema;
  value: unknown;
};

export type TJwtToken = {
  expiresIn: string;
  secret: string;
};

export type TDataForCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

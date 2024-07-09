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

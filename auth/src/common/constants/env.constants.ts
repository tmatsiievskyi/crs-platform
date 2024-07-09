export const ENV_DEVELOPMENT = 'development';
export const ENV_TEST = 'test';
export const ENV_PRODUCTION = 'production';

export type TEnv =
  | typeof ENV_DEVELOPMENT
  | typeof ENV_PRODUCTION
  | typeof ENV_TEST;

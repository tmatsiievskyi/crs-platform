// import dotenv from 'dotenv';
// dotenv.config();

export const config = {
  server: {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV as string,
  },
  db: {
    pool: {
      poolMin: Number(process.env.DATABASE_POOL_MIN),
      poolMax: Number(process.env.DATABASE_POOL_MAX),
      poolIdle: Number(process.env.DATABASE_POOL_IDLE),
      createTimeoutMillis: Number(process.env.CREATE_TIMEOUT_MILLIS),
      acquireTimeoutMillis: Number(process.env.ACQUIRE_TIMEOUT_MILLIS),
      idleTimeoutMillis: Number(process.env.IDLE_TIMEOUT_MILLIS),
      reapIntervalMillis: Number(process.env.REAP_INTERVAL_MILLIS),
      createRetryIntervalMillis: Number(
        process.env.CREATE_RETRY_INTERVAL_MILLIS,
      ),
    },
    client: process.env.DATABASE_CLIENT as string,
  },
  pg: {
    connection: {
      host: process.env.POSTGRES_HOST as string,
      database: process.env.POSTGRES_DB as string,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
    },
  },
} as const;

export type TConfig = typeof config;
export type TConfigKeys = keyof TConfig;

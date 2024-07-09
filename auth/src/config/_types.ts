import { TEnv } from '@common/constants';
import { ELogClient } from '@common/enums';
import { TConfigSSL, TCors } from '@common/types';

export interface IAppConfig {
  cors: TCors;
  domain: string;
  env: TEnv;
  host: string;
  name: string;
  port: number;
}

export type ILoggerConfig = {
  apiKey?: string;
  client: ELogClient;
  enabled: boolean;
  ssl?: Pick<TConfigSSL, 'ca'>;
  url?: string;
};

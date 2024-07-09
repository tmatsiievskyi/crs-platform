import { ConfigCore } from '@core/config.core';
import { ILoggerConfig } from './_types';
import { ELogClient } from '@common/enums';
import { TConfigSSL } from '@common/types';

export class LoggerConfig extends ConfigCore implements ILoggerConfig {
  apiKey?: string | undefined;
  client!: ELogClient;
  enabled!: boolean;
  ssl!: Pick<TConfigSSL, 'ca'> | undefined;
  url?: string | undefined;

  constructor() {
    super();

    this.init();
  }

  protected init() {
    this.apiKey = this.set<string>(
      'LOG_API_KEY',
      this.schema.string().allow(null, ''),
    );

    this.client = this.set<ELogClient>(
      'LOG_CLIENT',
      this.schema
        .string()
        .valid(ELogClient.CONSOLE)
        .allow(null, '')
        .default(ELogClient.CONSOLE),
    );

    this.enabled = this.set<boolean>(
      'LOG_ENABLED',
      this.schema.boolean().allow(null, '').default('true'),
    );

    this.url = this.set<string>(
      'LOG_URL',
      this.schema.string().allow(null, ''),
    );
  }
}

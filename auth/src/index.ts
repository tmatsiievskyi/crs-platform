import 'reflect-metadata';

import { container, inject, singleton } from 'tsyringe';

import '@providers/provider.di';
import '@config/config.di';
import '@middleware/middleware.di';
import '@modules/modules.di';

import { Server } from '@server/server';

import { ELoggerInject, ILoggerService } from './providers/logger';

@singleton()
class Bootstrap {
  constructor(
    @inject(Server) private readonly server: Server,
    @inject(ELoggerInject.SERVICE) private readonly logger: ILoggerService,
  ) {}

  public async run() {
    try {
      await this.server.run();
      this.logger.log('The server is running');
    } catch (error) {
      this.logger.error('App Error:', error);
      process.exit(1);
    }
  }
}

void container.resolve(Bootstrap).run();

// CREATE EXTENSION pg_trgm;

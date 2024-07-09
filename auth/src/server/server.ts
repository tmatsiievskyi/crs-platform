import { Server as HttpServer, createServer } from 'http';

import express, { Application as ExpressServer } from 'express';
import { singleton, inject } from 'tsyringe';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';

import { EConfigKey, EMiddlewareKey } from '@common/enums';
import { IAppConfig } from '@config/_types';
import { ELoggerInject, ILoggerService } from '@providers/logger';
import { IMiddleware } from '@common/types';
import { AppRouter } from './router';

@singleton()
export class Server {
  private express!: ExpressServer;
  private http!: HttpServer;
  private port: number;

  constructor(
    @inject(EConfigKey.APP) private readonly appConfig: IAppConfig,
    @inject(ELoggerInject.SERVICE)
    private readonly loggerService: ILoggerService,
    @inject(EMiddlewareKey.INIT) private readonly initMiddleware: IMiddleware,
    @inject(EMiddlewareKey.LOGGER) private readonly initReqLogger: IMiddleware,
    @inject(EMiddlewareKey.ERROR) private readonly errorMiddleware: IMiddleware,
    @inject(AppRouter) private readonly router: AppRouter,
  ) {
    this.port = Number(this.appConfig.port);
  }

  private handleRouter() {
    this.express.use(this.router.getRouter());
  }

  private handleMiddlewareBefore() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cookieParser());

    this.express.use(this.initMiddleware.handler());
    this.express.use(this.initReqLogger.handler());
  }

  private handleMiddlewareAfter() {
    this.express.use(this.errorMiddleware.handler());
  }

  public async run(): Promise<void> {
    this.express = express();
    this.http = createServer(this.express);

    this.handleMiddlewareBefore();
    this.handleRouter();
    this.handleMiddlewareAfter();

    await this.listenHttpServer();
  }

  private async listenHttpServer(): Promise<void> {
    return new Promise((res) => {
      process.on('unhandledRejection', (reason) => {
        this.loggerService.error('Unhandledrejection', {
          error: reason,
        });
      });

      process.on('rejectionHandled', (reason) => {
        this.loggerService.warn('RejectionHandler', {
          error: reason,
        });
      });

      process.on('multipleResolves', (type, promise, reason) => {
        this.loggerService.error('MultipleResolves', {
          error: { type, promise, reason },
        });
      });

      process.on('uncaughtException', (error) => {
        this.loggerService.error('UncaughtException', { error });
        process.exit(1);
      });

      return this.http.listen(this.port, () => {
        this.loggerService.log(`Listen: ${this.port}`);
        return res();
      });
    });
  }
}

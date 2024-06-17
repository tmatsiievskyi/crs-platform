import { API_PREF } from '@common';
import { IContainer, IController } from '@itypes';
import { bodyParser, errorMiddleware } from '@middleware';
import { requestLogger } from '@utils';
import express, { Application } from 'express';

export class ExpressServer {
  private readonly server: Application = express();

  constructor(
    private readonly routes: Record<string, IController>,
    private readonly container: IContainer,
  ) {}

  private initRouting() {
    for (const [name, controller] of Object.entries(this.routes)) {
      this.server.use(API_PREF, controller.router);
    }
    this.server.use('*', (req, res) => {
      res.status(404).send('Not Found');
    });
  }

  private initErrorHandling() {
    this.server.use(
      errorMiddleware(this.container.logger, this.container.formatter),
    );
  }

  private initRequestLogging() {
    this.server.use(requestLogger);
  }

  private initMiddlewares() {
    this.server.use(bodyParser);
  }

  public async startServer() {
    //security
    //middlewares
    this.initMiddlewares();
    this.initRequestLogging();
    this.initRouting();
    this.initErrorHandling();
    //apidocs

    this.server.get('/v1/api/auth/currentuser', (req, res) => {
      res.send('Current User');
    });

    this.server.listen(3000, () => console.log('Server listen port: 3000'));
  }
}

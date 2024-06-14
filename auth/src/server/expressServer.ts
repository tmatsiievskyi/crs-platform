import { API_PREF } from '@common';
import { router } from '@router';
import express, { Application } from 'express';

export class ExpressServer {
  private readonly server: Application = express();

  private initRouting() {
    this.server.use(API_PREF, router);
  }

  public async startServer() {
    this.initRouting();
    this.server.get('/v1/api/auth/currentuser', (req, res) => {
      res.send('Current User');
    });

    this.server.listen(3000, () =>
      console.log('Server listen port: 3000!!!!!')
    );
  }
}

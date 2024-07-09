import { TRequest, TResponse } from '@common/types';
import { RouterCore } from '@core/router.core';
import { singleton } from 'tsyringe';

@singleton()
export class AppRouter extends RouterCore {
  constructor() {
    super();

    this.init();
  }

  protected init(): void {
    this.base();

    this.notFound();
  }

  private base() {
    this.router.get('/', (_req: TRequest, res: TResponse) =>
      res.json({ message: 'Base. Works' }),
    );
  }

  private notFound() {
    this.router.use((_req: TRequest, res: TResponse) => {
      res.send('Not Found');
    });
  }
}

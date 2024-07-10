import { TRequest, TResponse } from '@common/types';
import { RouterCore } from '@core';
import { AuthRouter } from '@modules/auth/auth.router';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AppRouter extends RouterCore {
  constructor(@inject(AuthRouter) private readonly authRouter: AuthRouter) {
    super();

    this.init();
  }

  protected init(): void {
    this.base();

    this.router.use(
      '/v1/api/auth',
      this.authRouter.getRouter(),
      // (_req: TRequest, res: TResponse) => res.json({ message: 'sign iiin' }),
    );

    this.notFound();
  }

  private base() {
    this.router.get('/', (_req: TRequest, res: TResponse) =>
      res.json({ message: 'Base. Works' }),
    );
  }

  private notFound() {
    //TODO: update
    this.router.use((_req: TRequest, res: TResponse) => {
      res.send('Not Found');
    });
  }
}

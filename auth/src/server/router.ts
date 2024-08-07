import { TRequest, TResponse } from '@common/types';
import { RouterCore } from '@core';
import { AuthRouter } from '@modules/auth/auth.router';
import { UsersRouter } from '@modules/users/users.router';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AppRouter extends RouterCore {
  constructor(
    @inject(AuthRouter) private readonly authRouter: AuthRouter,
    @inject(UsersRouter) private readonly usersRouter: UsersRouter,
  ) {
    super();

    this.init();
  }

  protected init(): void {
    this.base();

    this.router.use('/v1/api/auth', this.authRouter.getRouter());

    this.router.use('/v1/api/users', this.usersRouter.getRouter());

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

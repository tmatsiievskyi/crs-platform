import { EUsersKey, EUsersPaths } from '@common/enums';
import { RouterCore } from '@core';
import { inject, injectable } from 'tsyringe';
import { IUsersController } from './_users.type';

@injectable()
export class UsersRouter extends RouterCore {
  constructor(
    @inject(EUsersKey.CONTROLLER)
    private readonly controller: IUsersController,
  ) {
    super();

    this.init();
  }

  protected init() {
    this.router.get(EUsersPaths.ALL, this.controller.all);
  }
}

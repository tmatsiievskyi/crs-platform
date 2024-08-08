import { EMiddlewareKey, EUsersKey, EUsersPaths } from '@common/enums';
import { RouterCore } from '@core';
import { inject, injectable } from 'tsyringe';
import { IUsersController, IUsersSchema } from './_users.type';
import { IMiddleware } from '@common/types';

@injectable()
export class UsersRouter extends RouterCore {
  constructor(
    @inject(EUsersKey.CONTROLLER)
    private readonly controller: IUsersController,
    @inject(EMiddlewareKey.VALIDATE)
    private readonly validateMiddleware: IMiddleware,
    @inject(EUsersKey.SCHEMA)
    private readonly usersSchema: IUsersSchema,
    @inject(EMiddlewareKey.AUTH)
    private readonly authMiddleware: IMiddleware,
  ) {
    super();

    this.init();
  }

  protected init() {
    this.router.get(
      EUsersPaths.ALL,
      this.authMiddleware.handler(),
      this.controller.all,
    );
    this.router.get(
      EUsersPaths.FIND_BY_ID,
      this.validateMiddleware.handler(this.usersSchema.findUserById()),
      this.authMiddleware.handler(),
      this.controller.getById,
    );
    this.router.post(EUsersPaths.CREATE, this.controller.create); // TODO: add verification
  }
}

import { ControllerCore } from '@core';
import { inject, injectable } from 'tsyringe';
import { IUsersController, IUsersService } from './_users.type';
import { TRequest, TResponse, TNext } from '@common/types';
import { EUsersKey } from '@common/enums';

@injectable()
export class UsersController
  extends ControllerCore
  implements IUsersController
{
  constructor(
    @inject(EUsersKey.SERVICE)
    protected readonly usersService: IUsersService,
  ) {
    super();
  }

  all = async (_req: TRequest, res: TResponse, next: TNext): Promise<void> => {
    try {
      const data = await this.usersService.getList({});
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: TRequest,
    res: TResponse,
    next: TNext,
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const data = await this.usersService.getById(id);
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };
}

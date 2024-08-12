import { ControllerCore } from '@core';
import { inject, injectable } from 'tsyringe';
import {
  IUsersController,
  IUsersService,
  TChangeCurrentUserPasswordRequest,
  TCreateUserRequest,
} from './_users.type';
import { TRequest, TResponse, TNext } from '@common/types';
import { EHttpStatusCode, EUsersModule } from '@common/enums';
import { successMessage } from '@common/messages';

@injectable()
export class UsersController
  extends ControllerCore
  implements IUsersController
{
  constructor(
    @inject(EUsersModule.SERVICE)
    protected readonly usersService: IUsersService,
  ) {
    super();
  }

  all = async (_req: TRequest, res: TResponse, next: TNext): Promise<void> => {
    try {
      const data = await this.usersService.findAll({});
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
      const data = await this.usersService.findById(id);
      return this.sendJSON(res, data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: TCreateUserRequest, res: TResponse) => {
    try {
      await this.usersService.create(req.body);

      return this.sendJSON(
        res,
        {
          message: 'Created',
          statusCode: EHttpStatusCode.CREATED,
        },
        {
          status: EHttpStatusCode.CREATED,
        },
      );
    } catch (error) {}
  };

  getCurrentUser = async (
    req: TRequest,
    res: TResponse,
    next: TNext,
  ): Promise<void> => {
    try {
      const { id } = req.user;
      const user = await this.usersService.findById(id);

      return this.sendJSON(res, user);
    } catch (error) {
      next(error);
    }
  };

  changePasswordCurrentUser = async (
    req: TChangeCurrentUserPasswordRequest,
    res: TResponse,
    next: TNext,
  ): Promise<void> => {
    try {
      const { id } = req.user;

      await this.usersService.updatePassword(id, req.body);

      return this.sendJSON(res, successMessage.changePassword);
    } catch (error) {
      next(error);
    }
  };
}

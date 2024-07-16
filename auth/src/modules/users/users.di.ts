import { DiCore } from '@core';
import { container } from 'tsyringe';
import { IUsersController, IUsersDao, IUsersService } from './_users.type';
import { EUsersKey } from '@common/enums';
import { UsersDao } from './users.dao';
import { UsersController } from './users.contoller';
import { UsersService } from './users.service';

export class UsersDi extends DiCore {
  register(): void {
    this.registerDao();
    this.registerController();
    this.registerService();
  }

  private registerDao() {
    container.registerSingleton<IUsersDao>(EUsersKey.DAO, UsersDao);
  }

  private registerController() {
    container.registerSingleton<IUsersController>(
      EUsersKey.CONTROLLER,
      UsersController,
    );
  }

  private registerService() {
    container.register<IUsersService>(EUsersKey.SERVICE, UsersService);
  }
}

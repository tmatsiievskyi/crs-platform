import { DiCore } from '@core';
import { container } from 'tsyringe';
import {
  IUsersController,
  IUsersSchema,
  IUsersService,
  IUsersValidatorService,
} from './_users.type';
import { EUsersKey } from '@common/enums';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.contoller';
import { UsersService } from './users.service';
import { UsersSchema } from './users.schema';
import { UsersValidationService } from './users.validator.service';

export class UsersDi extends DiCore {
  register(): void {
    this.registerRepository();
    this.registerController();
    this.registerService();
    this.registerSchema();
    this.registerUserValidationService();
  }

  private registerRepository() {
    container.registerSingleton(EUsersKey.REPOSITORY, UsersRepository);
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

  private registerSchema() {
    container.register<IUsersSchema>(EUsersKey.SCHEMA, UsersSchema);
  }

  private registerUserValidationService() {
    container.register<IUsersValidatorService>(
      EUsersKey.VALIDATION_SERVICE,
      UsersValidationService,
    );
  }
}

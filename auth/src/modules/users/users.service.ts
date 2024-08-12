import { ServiceCore } from '@core';
import {
  IUsersRepository,
  IUsersService,
  IUsersValidatorService,
  TUserChangePassword,
  TUserQuery,
} from './_users.type';
import { inject, injectable } from 'tsyringe';
import { EUsersModule } from '@common/enums';
import { Crypting } from '@common/utils';
import { TUserInsert } from '@common/types';

@injectable()
export class UsersService extends ServiceCore implements IUsersService {
  constructor(
    @inject(EUsersModule.REPOSITORY)
    protected readonly usersRepository: IUsersRepository,
    @inject(EUsersModule.VALIDATION_SERVICE)
    private readonly validationService: IUsersValidatorService,
  ) {
    super();
  }

  findAll(_query: TUserQuery) {
    return this.usersRepository.all();
  }

  findById(id: number) {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  create(data: TUserInsert) {
    //TODO: add type
    return this.usersRepository.create(data);
  }

  async updatePassword(id: number, data: TUserChangePassword) {
    const { oldPassword, newPassword } = data;

    this.validationService.checkNewPassword(oldPassword, newPassword);
    const userData = await this.usersRepository.findById(id, ['password']);

    await this.validationService.checkOldPassword(userData, oldPassword);

    const hashedPassword = await Crypting.hashPassword(newPassword);
    await this.usersRepository.update(id, { password: hashedPassword });

    return 'ok';
  }
}

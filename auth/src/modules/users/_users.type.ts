import {
  TDeepPartial,
  TJsonSchemaOptions,
  TNext,
  TRequest,
  TResponse,
} from '@common/types';
import { Users } from '@db';

export type TUsers = Users;
export type TUserQuery = TDeepPartial<Users>;
export type TUserOptions = TUserQuery;

export interface IUsersSchema {
  findUserById(): TJsonSchemaOptions;
}

export interface IUsersController {
  all(req: TRequest, res: TResponse, next: TNext): Promise<void>;
  getById(req: TRequest, res: TResponse, next: TNext): Promise<void>;
}

export interface IUsersService {
  getList(query: TUserQuery): Promise<Users[]>;
  getById(id: number): Promise<Users | undefined>;
}

export interface IUsersRepository {
  all(): Promise<Users[]>;
  findById(id: number): Promise<Users | undefined>;
}

import {
  TDeepPartial,
  TJsonSchemaOptions,
  TNext,
  TRequest,
  TResponse,
} from '@common/types';
import { Users } from '@db';

export type TUsers = Omit<Users, 'id' | 'emailVerified'> & {
  id: number;
  emailVerified: boolean;
};
export type TUserQuery = TDeepPartial<TUsers>;
export type TUserOptions = TUserQuery;
export type TCreateUser = TDeepPartial<TUsers>;

//requests
export type TCreateUserRequest = TRequest<unknown, unknown, TCreateUser>;
//---

export interface IUsersSchema {
  findUserById(): TJsonSchemaOptions;
}

export interface IUsersController {
  all(req: TRequest, res: TResponse, next: TNext): Promise<void>;
  getById(req: TRequest, res: TResponse, next: TNext): Promise<void>;
  create(req: TCreateUserRequest, res: TResponse, next: TNext): Promise<void>;
}

export interface IUsersService {
  findAll(query: TUserQuery): Promise<TUsers[]>;
  findById(id: number): Promise<TUsers | undefined>;
  findByEmail(email: string): Promise<TUsers | undefined>;
  create(data: TCreateUser): Promise<TUsers | undefined>;
}

export interface IUsersValidatorService {
  checkCredentials(user?: TUserQuery, password?: string): Promise<void>;
}

export interface IUsersRepository {
  all(): Promise<TUsers[]>;
  findById(id: number): Promise<TUsers | undefined>;
  findByEmail(email: string): Promise<TUsers | undefined>;
  create(data: TCreateUser): Promise<TUsers | undefined>;
}

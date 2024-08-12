import {
  TDeepPartial,
  TJsonSchemaOptions,
  TNext,
  TRequest,
  TResponse,
  TUserInsert,
  TUsers,
  TUserSelect,
  TUserUpdate,
} from '@common/types';

export type TUserQuery = TDeepPartial<TUsers>;
export type TUserOptions = TUserQuery;
export type TCreateUser = TDeepPartial<TUsers>;
export type TUserChangePassword = {
  newPassword: string;
  oldPassword: string;
};

//requests
export type TCreateUserRequest = TRequest<unknown, unknown, TUserInsert>;
export type TChangeCurrentUserPasswordRequest = TRequest<
  unknown,
  unknown,
  TUserChangePassword
>;
//---

export interface IUsersSchema {
  findUserById(): TJsonSchemaOptions;
  changePassword(): TJsonSchemaOptions;
}

export interface IUsersController {
  all(req: TRequest, res: TResponse, next: TNext): Promise<void>;
  getById(req: TRequest, res: TResponse, next: TNext): Promise<void>;
  create(req: TCreateUserRequest, res: TResponse, next: TNext): Promise<void>;
  getCurrentUser(req: TRequest, res: TResponse, next: TNext): Promise<void>;
  changePasswordCurrentUser(
    req: TChangeCurrentUserPasswordRequest,
    res: TResponse,
    next: TNext,
  ): Promise<void>;
}

export interface IUsersService {
  findAll(query: TUserQuery): Promise<TUsers[]>;
  findById(id: number): Promise<TUsers | undefined>;
  findByEmail(email: string): Promise<TUsers | undefined>;
  create(data: Omit<TUserInsert, 'id'>): Promise<TUsers | undefined>;
  updatePassword(id: number, data: TUserChangePassword): Promise<any>;
}

export interface IUsersValidatorService {
  checkCredentials(user?: TUserQuery, password?: string): Promise<void>;
  checkEmailIsNotEmpty(user?: TUserQuery): void;
  checkEmailIsNotVerified(user?: TUserQuery): void;
  checkNewPassword(oldPassword: string, newPassword: string): void;
  checkOldPassword(user?: Partial<TUsers>, password?: string): Promise<void>;
}

export interface IUsersRepository {
  all(): Promise<TUsers[]>;
  findById(
    id: number,
    data?: (keyof TUserSelect)[],
  ): Promise<TUsers | undefined>;
  findByEmail(email: string): Promise<TUsers | undefined>;
  create(data: Omit<TUserInsert, 'id'>): Promise<TUsers | undefined>;
  update(id: number, data: TUserUpdate): Promise<TUsers | undefined>;
}

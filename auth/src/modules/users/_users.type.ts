import { EUsersRole } from '@common/enums';
import {
  TDbDateInfo,
  TDeepPartial,
  TId,
  TNext,
  TRequest,
  TResponse,
} from '@common/types';

export type TUser = {
  firstName: null | string;
  lastName: null | string;
  email: null | string;
  emailVerified: boolean;
  password?: string;
  role: EUsersRole;
};

export type TFullUser = TUser & TId & TDbDateInfo;
export type TUserQuery = TDeepPartial<TFullUser>;

export interface IUsersController {
  all(req: TRequest, res: TResponse, next: TNext): Promise<void>;
}

export interface IUsersService {
  getList(query: TUserQuery): Promise<TFullUser[]>;
}

export interface IUsersDao {
  all(): Promise<TFullUser[]>;
}

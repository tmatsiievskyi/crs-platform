import { TDeleteResult } from '@common/types';
import { RefreshTokens } from '@db';

export type TCreateRefreshToken = Partial<
  Omit<RefreshTokens, 'created_at' | 'updated_at' | 'id' | 'expiresAt'>
> & { userId: number; jti: string; expiresAt: Date };
export type TUpdateRefreshToken = Partial<TCreateRefreshToken>;
export type TFullRefreshToken = RefreshTokens;

export interface IRefreshTokenService {
  create(data: TCreateRefreshToken): Promise<TFullRefreshToken>;
  deleteByUserId(userId: number): Promise<TDeleteResult>;
}
export interface IRefreshTokenRepository {
  create(data: TCreateRefreshToken): Promise<TFullRefreshToken>;
  // update(id: number, data?: TUpdateRefreshToken): Promise<TFullRefreshToken>;
  // delete(id: number): Promise<TDeleteResult>;
  deleteByUserId(userId: number): Promise<TDeleteResult>;
}

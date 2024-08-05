import { RefreshTokens } from '@db';

export type TCreateRefreshToken = Partial<
  Omit<RefreshTokens, 'created_at' | 'updated_at' | 'id' | 'expiresAt'>
> & { userId: number; jti: string; expiresAt: Date };
export type TFullRefreshToken = RefreshTokens;

export interface IRefreshTokenService {
  create(data: TCreateRefreshToken): Promise<TFullRefreshToken>;
}
export interface IRefreshTokenRepository {
  create(data: TCreateRefreshToken): Promise<TFullRefreshToken>;
}

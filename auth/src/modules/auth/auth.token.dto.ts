import { Exclude, Expose, Transform } from 'class-transformer';

import { ETokenTypes } from '@common/enums';
import { TTokenPayload } from '@common/types';

@Exclude()
export class AuthTokenDto implements TTokenPayload {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  @Transform(({ value }) => value || ETokenTypes.SIGNIN)
  type!: ETokenTypes;
}

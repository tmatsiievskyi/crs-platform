import { PageOptionsDto } from '@common/dtos';
import { DB, Users } from '@db';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { Insertable, Selectable, SelectExpression, Updateable } from 'kysely';
import { InsertExpression } from 'kysely/dist/cjs/parser/insert-values-parser';
import { UpdateObjectExpression } from 'kysely/dist/cjs/parser/update-set-parser';

export type TUsers = Omit<Users, 'id' | 'emailVerified'> & {
  id: number;
  emailVerified: boolean;
};

export type TUpdateObject = UpdateObjectExpression<DB, keyof DB>;
export type TSelectObject = SelectExpression<DB, keyof DB>;
export type TInsertObject = InsertExpression<DB, keyof DB>;

export type TUserUpdate = Updateable<TUsers>;
export type TUserInsert = Insertable<TUsers>;
export type TUserSelect = Selectable<TUsers>;

export interface IPagePayload {
  limit: number;
  offset: number;
  page: number;
}

export type TMappingParams<T, U> = {
  cls?: ClassConstructor<T>;
  data: U;
  itemCount?: number;
  options?: ClassTransformOptions;
  pageOptions?: PageOptionsDto;
};

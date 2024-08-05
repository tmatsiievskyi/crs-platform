import { PageOptionsDto } from '@common/dtos';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer';

export interface IPagePayload {
  limit: number;
  offset: number;
  page: number;
}

export type TMappingParams<T, U> = {
  cls?: ClassConstructor<T>;
  data: U;
  itemCount?: number;
  options: ClassTransformOptions;
  pageOptions?: PageOptionsDto;
};

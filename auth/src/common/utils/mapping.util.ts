import { TMappingParams } from '@common/types';
import { plainToInstance } from 'class-transformer';

export class MappingUtil {
  static objToDto<T extends Record<string, any>, V extends Array<any>>(
    params: TMappingParams<T, V>,
  ): T[];
  static objToDto<T extends Record<string, any>, V>(
    params: TMappingParams<T, V>,
  ): T;
  static objToDto<T extends Record<string, any>, V>({
    data,
    options,
    cls,
  }: TMappingParams<T, V | V[]>): T | T[] {
    return cls
      ? plainToInstance(cls, data, options)
      : (data as unknown as T | T[]);
  }
}

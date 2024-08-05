import { LIMIT_ITEM } from '@common/constants';
import { IPagePayload } from '@common/types';

export class PageOptionsDto implements IPagePayload {
  readonly limit: number = LIMIT_ITEM;
  readonly page: number = 1;

  get offset(): number {
    return ((this.page || 1) - 1) * (this.limit || LIMIT_ITEM);
  }
}

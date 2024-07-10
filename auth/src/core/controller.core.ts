import { EHttpStatusCode } from '@common/enums';
import { TRespCtx, TResponse } from '@common/types';
import { IAppConfig } from '@config/_types';

export class ControllerCore {
  protected readonly appConfig!: IAppConfig;

  protected sendJSON<T>(res: TResponse, data?: T, ctx?: TRespCtx) {
    res.status(ctx?.status || EHttpStatusCode.OK).json(data ? { data } : null);
  }
}

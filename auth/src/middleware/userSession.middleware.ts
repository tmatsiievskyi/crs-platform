import { TNext, TRequest, TRequestHandler, TResponse } from '@common/types';
import { IpUtil } from '@common/utils';
import { UserAgentUtil } from '@common/utils/ua.util';
import { UrlUtil } from '@common/utils/url.util';
import { MiddlewareCore } from '@core';
import { singleton } from 'tsyringe';

@singleton()
export class UserSessionMiddleware extends MiddlewareCore {
  handler(): TRequestHandler {
    return (req: TRequest, _res: TResponse, next: TNext) => {
      const userAgent = req.headers?.['user-agent'] || '';

      const ip = IpUtil.getIp(req);
      const os = UserAgentUtil.getOS(userAgent);
      const browser = UserAgentUtil.getBrowser(userAgent);
      const domain = UrlUtil.getDomain(req.headers?.origin);

      req.userSession = { os, ip, browser, domain, userAgent };

      next();
    };
  }
}

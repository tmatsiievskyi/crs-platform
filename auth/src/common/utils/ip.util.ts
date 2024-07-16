import { TRequest } from '@common/types';

export class IpUtil {
  static getIp<T extends Partial<TRequest>>(req: T) {
    const ips =
      req?.headers?.['cf-connecting-ip'] ||
      req?.headers?.['x-real-ip'] ||
      req?.headers?.['x-forwarded-for'] ||
      req?.ip ||
      '';

    return Array.isArray(ips)
      ? ips?.[0]?.trim() || null
      : ips?.split(',')?.[0]?.trim() || null;
  }
}

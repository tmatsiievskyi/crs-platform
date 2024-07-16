import { UAParser } from 'ua-parser-js';

export class UserAgentUtil {
  private static readonly parser = new UAParser();

  static getBrowser(ua?: string | null) {
    if (!ua) return '';

    return UserAgentUtil.parser?.setUA(ua)?.getBrowser()?.name || '';
  }

  static getOS(ua?: string | null) {
    if (!ua) return '';

    return UserAgentUtil.parser?.setUA(ua)?.getOS()?.name || '';
  }
}

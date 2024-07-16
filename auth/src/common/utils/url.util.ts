export class UrlUtil {
  static getDomain(url?: string) {
    const defautlDomain = 'localhost';

    try {
      return new URL(url || 'localhost')?.hostname || defautlDomain;
    } catch (error) {
      return defautlDomain;
    }
  }
}

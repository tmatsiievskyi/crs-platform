export class StringUtil {
  static capitalizeFirstChar(str?: string): string {
    if (typeof str !== 'string') {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static convertJsonToString<T>(data?: T): string {
    try {
      return JSON.stringify(data) ?? '';
    } catch {
      return '';
    }
  }

  static escape(str?: string | null) {
    if (typeof str !== 'string' || !str) {
      return '';
    }

    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#47;')
      .replace(/\\/g, '&#92;');
  }
}

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
}

import ms from 'ms';

export class DateUtil {
  static parseStringToMs(str: string): number {
    if (!str) {
      return 0;
    }

    return ms(str) || 0;
  }
}

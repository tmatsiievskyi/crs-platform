import ms from 'ms';
import {
  isValid as fnsIsValid,
  parseISO as fnsParseISO,
  getUnixTime as fnsGetUnixTime,
  addMilliseconds as fnsAddMilliseconds,
} from 'date-fns';
import { TFlexibleDate } from '@common/types';

export class DateUtil {
  static parseStringToMs(str: string): number {
    if (!str) {
      return 0;
    }

    return ms(str) || 0;
  }

  static parseISO(date: TFlexibleDate) {
    if (!date || !this.isValid(date)) {
      throw new Error('Invalid Date');
    }

    return typeof date === 'string' ? fnsParseISO(date) : date;
  }

  static toUnix(date: TFlexibleDate) {
    const dateISO = this.parseISO(date);

    return fnsGetUnixTime(dateISO);
  }

  static addMillisecondToDate(date: TFlexibleDate, amount?: number) {
    const dateISO = this.parseISO(date);

    return fnsAddMilliseconds(dateISO, amount || 0);
  }

  private static isValid(date?: TFlexibleDate) {
    try {
      return fnsIsValid(typeof date === 'string' ? Date.parse(date) : date);
    } catch (error) {
      throw new Error('Invalid Date');
    }
  }
}

export class CommonUtil {
  static isNullOrUndefined(val: any): boolean {
    return val === null || val === undefined;
  }

  static isEmpty(val?: any): boolean {
    return (typeof val !== typeof (val ?? 1) ||
      (val?.hasOwnProperty('length') && val?.length === 0) ||
      (val?.constructor === Object &&
        Object.keys(val).length === 0)) as boolean;
  }
}

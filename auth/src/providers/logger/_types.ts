import type { DestinationStream, Logger, LoggerOptions } from 'pino';

export type LoggerOptionsOrStream = LoggerOptions | DestinationStream;
export type LoggerOptionsAndStream = {
  options: LoggerOptions;
  stream: DestinationStream;
};

export interface ILoggerService {
  pino: Logger;
  debug(message: string, ...optionalParams: unknown[]): void;
  error(message: string, ...optionalParams: unknown[]): void;
  log(message: string, ...optionalParams: unknown[]): void;
  verbose?(message: string, ...optionalParams: unknown[]): void;
  warn(message: string, ...optionalParams: unknown[]): void;
}

export abstract class ILoggerTransportServiceInterface {
  options!: LoggerOptionsOrStream;
}

export abstract class ILoggerStreamTransportInterface {
  options!: LoggerOptionsAndStream;
}

export enum ELoggerInject {
  CONSOLE_TRANSPORT_SERVICE = 'LoggerConsoleTransportService',
  SERVICE = 'LoggerService',
}

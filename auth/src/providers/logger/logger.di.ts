import { container } from 'tsyringe';

import { DiCore } from '@core';

import {
  ELoggerInject,
  ILoggerService,
  ILoggerTransportServiceInterface,
} from './_types';
import { ConsoleTransport } from './logger.console.transport';
import { LoggerService } from './logger.service';

export class LoggerDi extends DiCore {
  register() {
    this.registerConsoleTransportService();

    this.registerService();
  }

  private registerConsoleTransportService() {
    container.registerSingleton<ILoggerTransportServiceInterface>(
      ELoggerInject.CONSOLE_TRANSPORT_SERVICE,
      ConsoleTransport,
    );
  }

  private registerService() {
    container.registerSingleton<ILoggerService>(
      ELoggerInject.SERVICE,
      LoggerService,
    );
  }
}

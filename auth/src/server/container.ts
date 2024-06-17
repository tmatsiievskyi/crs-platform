import { IContainer } from '@itypes';
import { FileService, Formatter, logger } from '@utils';

export const createContainer = (): IContainer =>
  ({
    fileService: new FileService(),
    formatter: new Formatter(),
    logger: logger,
  } as const);

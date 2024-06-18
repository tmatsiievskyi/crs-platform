import { IContainer, IDataProviders } from '@itypes';
import { FileService, Formatter, logger } from '@utils';

export const createContainer = (dataProviders: IDataProviders): IContainer =>
  ({
    fileService: new FileService(),
    formatter: new Formatter(),
    logger: logger,
    data: dataProviders,
  } as const);

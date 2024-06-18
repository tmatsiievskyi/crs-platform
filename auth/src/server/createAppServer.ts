import { IFileToSearch } from '@itypes';
import { ExpressServer } from './expressServer';
import { createRouting } from './routes';
import { createContainer } from './container';
import { logger } from '@utils';
import { config } from '@config';
import { createDataProviders } from '@data';

export async function createAppServer() {
  const controllersPath: IFileToSearch = {
    path: process.cwd() + '/src/services',
    suffix: '.controller.ts',
  } as const;
  const { db, pg, server: configServer } = config;

  try {
    const dataProviders = createDataProviders(db, pg, configServer);
    const container = createContainer(dataProviders);
    const routes = await createRouting(controllersPath, container, config);
    const server = new ExpressServer(routes, container, config);
    return server;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

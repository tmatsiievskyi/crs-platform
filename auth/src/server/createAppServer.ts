import { IFileToSearch } from '@itypes';
import { ExpressServer } from './expressServer';
import { createRouting } from './routes';
import { createContainer } from './container';

export async function createAppServer() {
  const controllersPath: IFileToSearch = {
    path: process.cwd() + '/src/services',
    suffix: '.controller.ts',
  } as const;

  try {
    const container = createContainer();
    const routes = await createRouting(controllersPath, container);
    const server = new ExpressServer(routes, container);
    return server;
  } catch (error) {
    // logger.error(error);
    process.exit(1);
  }
}

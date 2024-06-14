import { ExpressServer } from './expressServer';

export async function createAppServer() {
  const server = new ExpressServer();

  return server;
}

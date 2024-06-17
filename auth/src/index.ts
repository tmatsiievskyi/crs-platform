import { createAppServer } from '@server/createAppServer';

(async () => {
  const server = await createAppServer();
  server.startServer();
})();

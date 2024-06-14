import { createAppServer } from '@server/createAppServer';

(async () => {
  console.log('index 1');
  const server = await createAppServer();
  server.startServer();
})();

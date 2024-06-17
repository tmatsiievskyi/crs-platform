import { IContainer, IController } from '@itypes';
import { IFileToSearch } from '@itypes';
import { Router } from 'express';

export const createRouting = async (
  controllersPath: IFileToSearch,
  container: IContainer,
) => {
  const router = Router({ mergeParams: true });
  const routes: Record<string, IController> = {};

  const controllersPaths = await container.fileService.readDirRecur(
    controllersPath.path,
    controllersPath.suffix,
  );

  for (const { fileName, fullName, filePath } of controllersPaths) {
    const controller = new (await import(filePath)).default(router, container);
    routes[fileName] = controller;
  }
  return routes;
};

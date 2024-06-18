import { TConfig } from '@config';
import { IContainer, IController, IDataProviders } from '@itypes';
import { IFileToSearch } from '@itypes';
import { Router } from 'express';

export const createRouting = async (
  controllersPath: IFileToSearch,
  container: IContainer,
  config: TConfig,
) => {
  const router = Router({ mergeParams: true });
  const routes: Record<string, IController> = {};

  const controllersPaths = await container.fileService.readDirRecur(
    controllersPath.path,
    controllersPath.suffix,
  );

  for (const { fileName, fullName, filePath } of controllersPaths) {
    const controller = new (await import(filePath)).default(
      router,
      container,
      config,
    );
    routes[fileName] = controller;
  }
  return routes;
};

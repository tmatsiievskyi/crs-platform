import { readFileSync, statSync, promises as fsp } from 'node:fs';
import {} from 'node:path';

export class FileService {
  //   static info(path: string) {
  //     try {
  //       return statSync(path);
  //     } catch (error) {
  //       throw new Error(`Error getting info: ${path} \n ${error}`);
  //     }
  //   }

  static readDir = (path: string) => fsp.readdir(path);

  static;
}

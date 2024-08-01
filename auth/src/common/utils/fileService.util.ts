import { promises as fsp } from 'node:fs';
import {} from 'node:path';

export class FileService {
  static readDir = (path: string) => fsp.readdir(path);
}

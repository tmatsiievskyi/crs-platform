import { FileService, Formatter } from '@utils';
import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from 'pino';
import { IDataProviders } from './data.type';

export interface IRequest extends Request {}
export interface IResponse extends Response {}
export interface INext extends NextFunction {}
export interface IRouter extends Router {}

export interface IFileToSearch {
  path: string;
  suffix: string;
}

export interface IContainer {
  formatter: Formatter;
  fileService: FileService;
  logger: Logger;
  data: IDataProviders;
}

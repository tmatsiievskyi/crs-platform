import pino from 'pino';
import pinoHttp from 'pino-http';
import { randomUUID } from 'node:crypto';

export const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    process.env.NODE_ENV !== 'development' //TODO: add env
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : undefined,
});

export const requestLogger = pinoHttp({
  genReqId: (req) => {
    req.id = randomUUID();
    return req.id;
  },
  serializers: {
    req: pino.stdSerializers.wrapRequestSerializer((req) => {
      return {
        id: req.raw.id,
        method: req.raw.method,
        path: req?.raw?.url?.split('?')[0],
        headers: {
          host: req.raw.headers.host,
          'user-agent': req.raw.headers['user-agent'],
          referer: req.raw.headers.referer,
        },
      };
    }),
  },

  customLogLevel: (res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
});

// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();
import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import 'reflect-metadata';

import { authMiddleware } from './middleware/authentication';
import { globalRouter } from './router/global.router';
import { createDBConnection } from './util/connectDB.util';
import { Logger } from './util/logger.util';

const logger: Logger = new Logger(path.basename(__filename));
const port: number = Number(process.env.SERVER_PORT);

/**
 * Main method to start the server.
 */
export const run = async () => {
  try {
    const app = express();
    await createDBConnection();

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(authMiddleware);
    app.use('/api', globalRouter);

    app.listen(port, () => {
      logger.log(`Server is now listening at http://localhost:${port}`);
    });
  } catch (error) {
    logger.log(`${error}`);
  }
};

// tslint:disable-next-line: no-floating-promises
run();

import path from 'path';
import { createConnection } from 'typeorm';
import { Logger } from './logger.util';

const logger: Logger = new Logger(path.basename(__filename));

/**
 * Helper to create a DB connection.
 */
export const createDBConnection = async () => {
  let retries: number = Number(process.env.DB_CONNECTION_RETRIES);
  do {
    try {
      logger.log(`Connection successfully establish.`);
      return createConnection();
    } catch (error) {
      logger.log(`Connection failed. Retries left: ${retries}.`);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000)); // Retry after waiting for 5 seconds
    }
  } while (retries > 0);
  throw Error("Couldn't establish a connection to the DB!");
};

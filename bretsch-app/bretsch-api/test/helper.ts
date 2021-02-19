import * as bodyParser from 'body-parser';
import express, { Express } from 'express';
import * as path from 'path';
import { Connection, createConnection, ObjectType } from 'typeorm';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli';
import { User } from '../src/entity/User.entity';
import { Authentication, authMiddleware } from '../src/middleware/authentication';
import { globalRouter } from '../src/router/global.router';

/**
 * Helper for our test environment using jest and fixtures.
 */
export class Helper {
  public app: Express | null;
  private dbConnection: Connection;

  /**
   * Initialize the tests
   */
  public async init() {
    jest.setTimeout(10000);
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(authMiddleware);

    this.app.use('/api', globalRouter);
    this.dbConnection = await createConnection();

    /**
     * These two lines cause an error runnng the tests
     *
     **/
    // await this.resetDatabase();
    // await this.loadFixtures();
  }

  /**
   * Reset the db by synchronizing all table schemas
   */
  public resetDatabase = async () => {
    await this.dbConnection.synchronize(true);
  };

  /**
   * Close the db connection.
   */
  public async shutdown() {
    return this.dbConnection.close();
  }

  /**
   * Load the defined fixtures into the db.
   */
  public async loadFixtures() {
    const loader = new Loader();
    loader.load(path.resolve('./src/fixture/'));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(this.dbConnection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = (await builder.build(fixture)) as any;
      await this.getRepo(entity.constructor.name).save(entity);
    }
  }

  /**
   * Get a repository of the db.
   * @param target The entity of the repository.
   */
  public getRepo<Entity>(target: ObjectType<Entity>) {
    return this.dbConnection.getRepository(target);
  }

  public async loginUser(userEmail: string) {
    const user = await this.getRepo(User).findOneOrFail({ email: userEmail });

    return Authentication.generateToken({
      email: user.email,
      id: user.userId.toString(),
      name: user.firstName,
      role: user.userRole,
    });
  }
}

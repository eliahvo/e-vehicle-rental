/* istanbul ignore file */

const dir = (path) => {
  let dir = 'src';
  switch (process.env.NODE_ENV) {
    case 'dev':
      dir = 'dist/src';
      break;
  }
  return `${dir}/${path}`;
};

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [dir('/{entity,domain,projection}/**/**.entity.{ts,js}')],
  migrations: [dir('/migration/**/**.entity.{ts,js}')],
  subscribers: [dir('/{subscriber,domain,projection}/**/**.entity.{ts,js}')],
  cli: {
    entitiesDir: dir('/{entity,domain,projection}'),
    migrationsDir: dir('/migration'),
    subscribersDir: dir('/{subscriber,domain,projection}'),
  },
};

import dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'

dotenv.config()

const mssqlConnection: ConnectionOptions = {
  name: 'crisis_base',
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'tempdb',
  synchronize: false,
  logging: false,
  pool: { max: 50 }, // only allow n connections to the db
  extra: {
    connectionTimeout: 6000,
  },
  entities: ['dist/src/db/entities/**/*.js'],
  migrations: ['dist/src/db/migrations/**/*.js'],
  subscribers: ['dist/src/db/subscribers/**/*.js'],
  cli: {
    entitiesDir: 'dist/src/db/entities',
    migrationsDir: 'dist/src/db/migrations',
    subscribersDir: 'dist/src/db/subscribers',
  },
}

const config = {
  name: process.env.NAME || 'crisis',
  basePath: process.env.BASE_PATH || '/crisis',
  env: process.env.ENV || 'develop',
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || '3000',
  test: {
    url: `${process.env.TEST_HOST || 'http://localhost'}:${process.env.PORT || '3000'}`,
  },
  connection: mssqlConnection,
}

export default config

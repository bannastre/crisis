import dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'

dotenv.config()

export const mssqlConnection: ConnectionOptions = {
  name: 'default',
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'tempdb',
  synchronize: true,
  logging: false,
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
    url: `${process.env.HOST}:${process.env.PORT}` || 'http://localhost:3000',
  },
  connection: mssqlConnection,
}

export default config

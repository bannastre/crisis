'use strict'
require('dotenv').config()

module.exports = {
  name: 'default',
  type: 'postgres',
  logging: process.env.DB_SCHEMA_LOGGING,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SCHEMA_SSL === 'true' ? true : false,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: `${process.env.DB_NAME}_${process.env.ENV}`,
  schema: process.env.DB_SCHEMA,
  synchronize: process.env.DB_SYNCHRONIZE,
  entities: ['dist/src/db/entities/**/*.js'],
  migrations: ['dist/src/db/migrations/**/*.js'],
  subscribers: ['dist/src/db/subscribers/**/*.js'],
  cli: {
    entitiesDir: 'dist/src/db/entities',
    migrationsDir: 'dist/src/db/migrations',
    subscribersDir: 'dist/src/db/subscribers',
  },
}

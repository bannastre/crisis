'use strict'
require('dotenv').config()

const mssqlConnection = {
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

module.exports = mssqlConnection

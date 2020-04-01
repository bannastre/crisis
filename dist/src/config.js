"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mssqlConnection = {
    name: 'crisis_base',
    type: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'tempdb',
    connectionTimeout: 8000,
    pool: { max: 50 },
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
};
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
};
exports.default = config;
//# sourceMappingURL=config.js.map
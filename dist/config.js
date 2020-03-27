"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    name: process.env.NAME || 'crisis',
    basePath: process.env.BASE_PATH || '/crisis',
    env: process.env.ENV || 'test',
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || '3000',
    test: {
        url: `${process.env.HOST}:${process.env.PORT}` || 'http://localhost:3000',
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map
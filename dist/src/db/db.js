"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config"));
class Db {
    constructor(connectionOptions) {
        this.connectionOptions = connectionOptions;
    }
    getConnection() {
        if (!this.connection) {
            throw new Error('Database connections not initialised');
        }
        // @ts-ignore
        this.connection.buildMetadatas();
        return this.connection;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.initTypeOrm();
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                throw new Error('Database connections not initialised');
            }
            try {
                yield this.connection.close();
            }
            catch (e) {
                throw e;
            }
        });
    }
    initTypeOrm() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connections = yield typeorm_1.createConnections([this.connectionOptions]);
                this.connection = typeorm_1.getConnection('crisis_base');
                return connections;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.Db = Db;
const db = new Db(config_1.default.connection);
exports.default = db;
//# sourceMappingURL=db.js.map
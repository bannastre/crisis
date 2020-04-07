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
const db_1 = __importDefault(require("./db"));
exports.Db = db_1.default;
class DbSchema {
    constructor(db) {
        this.db = db;
    }
    closeDatabaseConnections() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.close();
        });
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.isConnected();
        });
    }
    initialiseDatabaseConnections() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.setup();
        });
    }
    // NOTE: Loosening restrictions on SERIALIZABLE transactions to
    // NOTE: READ COMMITTED due to race conditions on dirty transactions
    getTransaction(isolationLevel = 'READ COMMITTED') {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('[DbSchema::getTransaction]');
            const connection = this.db.getConnection;
            const queryRunner = connection.createQueryRunner();
            if (!connection.isConnected) {
                queryRunner.connect();
            }
            yield queryRunner.startTransaction(isolationLevel);
            if (isolationLevel === 'SERIALIZABLE') {
                queryRunner.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE');
            }
            return queryRunner;
        });
    }
    getQueryRunner() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = this.db.getConnection;
            console.info('DbSchema::getQueryRunner');
            const queryRunner = yield connection.createQueryRunner();
            return queryRunner;
        });
    }
    getCustomRepository(queryRunner, customRepository) {
        const entityManager = queryRunner.manager;
        console.info('DbSchema::getCustomRepository');
        return entityManager.getCustomRepository(customRepository);
    }
}
exports.DbSchema = DbSchema;
//# sourceMappingURL=index.js.map
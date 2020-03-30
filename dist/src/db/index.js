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
function closeDatabaseConnections() {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.close();
    });
}
function initialiseDatabaseConnections() {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.setup();
    });
}
// NOTE: Loosening restrictions on SERIALIZABLE transactions to
// NOTE: READ COMMITTED due to race conditions on dirty transactions
function getTransaction(isolationLevel = 'READ COMMITTED') {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = db_1.default.getConnection;
        const queryRunner = yield connection.createQueryRunner();
        yield queryRunner.startTransaction(isolationLevel);
        console.info('DbSchema::getTransaction');
        if (isolationLevel === 'SERIALIZABLE') {
            queryRunner.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE READ ONLY DEFERRABLE');
        }
        return queryRunner;
    });
}
function getQueryRunner() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = db_1.default.getConnection;
        console.info('DbSchema::getQueryRunner');
        const queryRunner = yield connection.createQueryRunner();
        return queryRunner;
    });
}
function getCustomRepository(queryRunner, customRepository) {
    const entityManager = queryRunner.manager;
    console.info('DbSchema::getCustomRepository');
    return entityManager.getCustomRepository(customRepository);
}
const dbSchema = {
    closeDatabaseConnections,
    getCustomRepository,
    getQueryRunner,
    getTransaction,
    initialiseDatabaseConnections,
};
exports.default = dbSchema;
//# sourceMappingURL=index.js.map
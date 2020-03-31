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
const __1 = __importDefault(require("../"));
const config_1 = __importDefault(require("../../config"));
const types_1 = require("../../types");
const priority_1 = require("../entities/priority");
/**
 * This creates a prorities
 */
exports.priorityEntities = [
    {
        grant: types_1.GrantEnum.FOOD_DELIVERY,
        description: 'Food delivery services',
    },
    {
        grant: types_1.GrantEnum.HEALTHCARE_MEDECINE_DISPENSARY,
        description: 'Critical prescriptions & dispensary access',
    },
    {
        grant: types_1.GrantEnum.HEALTHCARE_CARE_VISITORS,
        description: 'Healthcare worker visitation priority',
    },
    {
        grant: types_1.GrantEnum.TRANSPORT_PRIVATE,
        description: 'Access to private transport during lockdown conditions',
    },
    {
        grant: types_1.GrantEnum.TRANSPORT_PUBLIC,
        description: 'Allowed on public transport during lockdown conditions',
    },
    {
        grant: types_1.GrantEnum.SCHOOLING_ACCESS,
        description: 'Schooling for children of grant owner',
    },
    {
        grant: types_1.GrantEnum.SCHOOLING_MEALS_AFTERSCHOOL,
        description: 'After-School meals for children of grant owner',
    },
];
class Priority1585494476694 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.default.initialiseDatabaseConnections();
            const transaction = yield __1.default.getTransaction();
            /**
             * Create an priority
             */
            const priorityRepository = transaction.manager.getRepository(priority_1.Priority);
            yield Promise.all(exports.priorityEntities.map((priority) => __awaiter(this, void 0, void 0, function* () {
                const priorityEntity = priorityRepository.create(priority);
                return yield priorityRepository.save(priorityEntity);
            })));
            yield transaction.commitTransaction();
            yield __1.default.closeDatabaseConnections();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM ${config_1.default.connection.database}.dbo.[priority]`);
        });
    }
}
exports.Priority1585494476694 = Priority1585494476694;
//# sourceMappingURL=1585494476694-priority.js.map
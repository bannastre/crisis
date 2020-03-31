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
const __1 = __importDefault(require(".."));
const identity_1 = require("../entities/identity");
const priority_1 = require("../entities/priority");
const identitypriority_1 = require("../entities/identitypriority");
const config_1 = __importDefault(require("../../config"));
const types_1 = require("../../types");
/**
 * This assigns a common and unique grants to a vulnerable person
 */
class IdentityPriority1585694701757 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.default.initialiseDatabaseConnections();
            const transaction = yield __1.default.getTransaction();
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            const priorityRepository = transaction.manager.getRepository(priority_1.Priority);
            const identitypriorityRepository = transaction.manager.getRepository(identitypriority_1.Identitypriority);
            // tslint:disable: variable-name
            const identity = yield identityRepository.findOne({
                where: {
                    lastName: 'Barton',
                },
            });
            /**
             * FOOD_DELIVERY
             *
             */
            const food_delivery_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.FOOD_DELIVERY },
            });
            const food_delivery_identitypriority = identitypriorityRepository.create({
                identity,
                priority: food_delivery_priority,
            });
            yield identitypriorityRepository.save(food_delivery_identitypriority);
            /**
             * TRANSPORT_PUBLIC
             *
             */
            const transport_public_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.TRANSPORT_PUBLIC },
            });
            const transport_public_identitypriority = identitypriorityRepository.create({
                identity,
                priority: transport_public_priority,
            });
            yield identitypriorityRepository.save(transport_public_identitypriority);
            /**
             * HEALTHCARE_MEDECINE_DISPENSARY
             *
             */
            const schooling_access_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.SCHOOLING_ACCESS },
            });
            const schooling_access_identitypriority = identitypriorityRepository.create({
                identity,
                priority: schooling_access_priority,
            });
            yield identitypriorityRepository.save(schooling_access_identitypriority);
            /**
             * HEALTHCARE_CARE_VISITORS
             *
             */
            const healthccare_care_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.HEALTHCARE_CARE_VISITORS },
            });
            const healthccare_care_identitypriority = identitypriorityRepository.create({
                identity,
                priority: healthccare_care_priority,
            });
            yield identitypriorityRepository.save(healthccare_care_identitypriority);
            yield transaction.commitTransaction();
            yield __1.default.closeDatabaseConnections();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM ${config_1.default.connection.database}.dbo.[identitypriority]`);
        });
    }
}
exports.IdentityPriority1585694701757 = IdentityPriority1585694701757;
//# sourceMappingURL=1585694701757-identityPriority.js.map
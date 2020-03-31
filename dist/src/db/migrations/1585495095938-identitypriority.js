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
class Identitypriority1585495095938 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.default.initialiseDatabaseConnections();
            const transaction = yield __1.default.getTransaction();
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            const priorityRepository = transaction.manager.getRepository(priority_1.Priority);
            const identitypriorityRepository = transaction.manager.getRepository(identitypriority_1.Identitypriority);
            const identities = yield identityRepository.find();
            // tslint:disable: variable-name
            // FOOD_DELIVERY
            const food_delivery_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.FOOD_DELIVERY },
            });
            const food_delivery_identitypriority = identitypriorityRepository.create({
                identity: identities[0],
                priority: food_delivery_priority,
            });
            yield identitypriorityRepository.save(food_delivery_identitypriority);
            const food_delivery_identitypriority_2 = identitypriorityRepository.create({
                identity: identities[1],
                priority: food_delivery_priority,
            });
            yield identitypriorityRepository.save(food_delivery_identitypriority_2);
            // TRANSPORT_PUBLIC
            const transport_public_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.TRANSPORT_PUBLIC },
            });
            const transport_public_identitypriority = identitypriorityRepository.create({
                identity: identities[0],
                priority: transport_public_priority,
            });
            yield identitypriorityRepository.save(transport_public_identitypriority);
            const transport_public_identitypriority_2 = identitypriorityRepository.create({
                identity: identities[1],
                priority: transport_public_priority,
            });
            yield identitypriorityRepository.save(transport_public_identitypriority_2);
            // SCHOOLING_ACCESS
            const schooling_access_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.SCHOOLING_ACCESS },
            });
            const schooling_access_identitypriority = identitypriorityRepository.create({
                identity: identities[0],
                priority: schooling_access_priority,
            });
            yield identitypriorityRepository.save(schooling_access_identitypriority);
            // HEALTHCARE_MEDECINE_DISPENSARY
            const healthcare_medecine_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.HEALTHCARE_MEDECINE_DISPENSARY },
            });
            const healthcare_medecine_identitypriority = identitypriorityRepository.create({
                identity: identities[0],
                priority: healthcare_medecine_priority,
            });
            yield identitypriorityRepository.save(healthcare_medecine_identitypriority);
            // HEALTHCARE_CARE_VISITORS
            const healthccare_care_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.HEALTHCARE_CARE_VISITORS },
            });
            const healthccare_care_identitypriority = identitypriorityRepository.create({
                identity: identities[0],
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
exports.Identitypriority1585495095938 = Identitypriority1585495095938;
//# sourceMappingURL=1585495095938-identitypriority.js.map
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
 * This creates idenitityPriorities for Sainsbury's demo purposes
 */
class IdentityPriority1585814278524 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.default.initialiseDatabaseConnections();
            const transaction = yield __1.default.getTransaction();
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            const priorityRepository = transaction.manager.getRepository(priority_1.Priority);
            const identitypriorityRepository = transaction.manager.getRepository(identitypriority_1.Identitypriority);
            /**
             *  KEY WORKER
             *
             *
             *
             *
             *
             *
             */
            // tslint:disable: variable-name
            const identity_ms = yield identityRepository.findOne({
                where: {
                    lastName: 'Swaine',
                },
            });
            const identity_ah = yield identityRepository.findOne({
                where: {
                    lastName: 'Hogwood',
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
                identity: identity_ms,
                priority: food_delivery_priority,
            });
            yield identitypriorityRepository.save(food_delivery_identitypriority);
            const food_delivery_identitypriority_ah = identitypriorityRepository.create({
                identity: identity_ah,
                priority: food_delivery_priority,
            });
            yield identitypriorityRepository.save(food_delivery_identitypriority_ah);
            /**
             * TRANSPORT_PUBLIC
             *
             */
            const transport_public_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.TRANSPORT_PUBLIC },
            });
            const transport_public_identitypriority = identitypriorityRepository.create({
                identity: identity_ms,
                priority: transport_public_priority,
            });
            yield identitypriorityRepository.save(transport_public_identitypriority);
            const transport_public_identitypriority_ah = identitypriorityRepository.create({
                identity: identity_ah,
                priority: transport_public_priority,
            });
            yield identitypriorityRepository.save(transport_public_identitypriority_ah);
            /**
             * SCHOOLING_ACCESS
             *
             */
            const schooling_access_priority = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.SCHOOLING_ACCESS },
            });
            const schooling_access_identitypriority = identitypriorityRepository.create({
                identity: identity_ms,
                priority: schooling_access_priority,
            });
            yield identitypriorityRepository.save(schooling_access_identitypriority);
            const schooling_access_identitypriority_ah = identitypriorityRepository.create({
                identity: identity_ah,
                priority: schooling_access_priority,
            });
            yield identitypriorityRepository.save(schooling_access_identitypriority_ah);
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
exports.IdentityPriority1585814278524 = IdentityPriority1585814278524;
//# sourceMappingURL=1585814278524-identityPriority.js.map
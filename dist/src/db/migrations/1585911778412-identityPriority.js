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
const __1 = require("..");
const identity_1 = require("../entities/identity");
const priority_1 = require("../entities/priority");
const identitypriority_1 = require("../entities/identitypriority");
const config_1 = __importDefault(require("../../config"));
const types_1 = require("../../types");
/**
 * This creates idenitityPriorities for Furlough demo
 */
// tslint:disable: variable-name
class IdentityPriority1585911778412 {
    constructor() {
        this.dbSchema = new __1.DbSchema(new __1.Db(config_1.default.connection));
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbSchema.initialiseDatabaseConnections();
            const transaction = yield this.dbSchema.getTransaction();
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            const priorityRepository = transaction.manager.getRepository(priority_1.Priority);
            const identitypriorityRepository = transaction.manager.getRepository(identitypriority_1.Identitypriority);
            // Create Identity
            const identity_rk = yield identityRepository.findOne({
                where: {
                    lastName: 'Kofeve',
                },
            });
            /**
             * FOOD_DELIVERY
             *
             */
            const food_delivery_priority_fw = yield priorityRepository.findOne({
                where: { grant: types_1.GrantEnum.FOOD_DELIVERY },
            });
            const food_delivery_identitypriority_fw = identitypriorityRepository.create({
                identity: identity_rk,
                priority: food_delivery_priority_fw,
            });
            yield identitypriorityRepository.save(food_delivery_identitypriority_fw);
            /**
             *  FURLOUGH
             */
            // Create Priority
            const mortgageHolidayPriGrant = priorityRepository.create({
                grant: types_1.GrantEnum.FINANCIAL_MORTGAGE_HOLIDAY,
                description: 'Mortgage Holiday',
            });
            const mortgageHolidayPriGrantEntity = yield priorityRepository.save(mortgageHolidayPriGrant);
            // Create Mortgage Holiday IdentityPriority
            const mortgageHolidayIdentitypriority = identitypriorityRepository.create({
                identity: identity_rk,
                priority: mortgageHolidayPriGrantEntity,
            });
            yield identitypriorityRepository.save(mortgageHolidayIdentitypriority);
            yield transaction.commitTransaction();
            yield this.dbSchema.closeDatabaseConnections();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM ${config_1.default.connection.database}.dbo.[identitypriority]`);
        });
    }
}
exports.IdentityPriority1585911778412 = IdentityPriority1585911778412;
//# sourceMappingURL=1585911778412-identityPriority.js.map
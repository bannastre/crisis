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
// import dbSchema from '..'
// import { Identity, IIdentity } from '../entities/identity'
// import { Priority, IPriority } from '../entities/priority'
// import { Identitypriority, IIdentitypriority } from '../entities/identitypriority'
const config_1 = __importDefault(require("../../config"));
// import { GrantEnum } from '../../types'
/**
 * This assigns a unique grants to a key worker
 */
class IdentityPriority1585694699034 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             *
             * NO LONGER REQUIRED
             *
             */
            // await dbSchema.initialiseDatabaseConnections()
            // const transaction = await dbSchema.getTransaction()
            // const identityRepository = transaction.manager.getRepository(Identity)
            // const priorityRepository = transaction.manager.getRepository(Priority)
            // const identitypriorityRepository = transaction.manager.getRepository(Identitypriority)
            // const identity: IIdentity = await identityRepository.findOne({
            //   where: {
            //     lastName: 'Harper',
            //   },
            // })
            // /**
            //  * SCHOOLING_ACCESS
            //  *
            //  */
            // // tslint:disable: variable-name
            // const schooling_access_priority: IPriority = await priorityRepository.findOne({
            //   where: { grant: GrantEnum.SCHOOLING_ACCESS },
            // })
            // const schooling_access_identitypriority: IIdentitypriority = identitypriorityRepository.create({
            //   identity,
            //   priority: schooling_access_priority,
            // })
            // await identitypriorityRepository.save(schooling_access_identitypriority)
            // await transaction.commitTransaction()
            // await dbSchema.closeDatabaseConnections()
            return;
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM ${config_1.default.connection.database}.dbo.[identitypriority]`);
        });
    }
}
exports.IdentityPriority1585694699034 = IdentityPriority1585694699034;
//# sourceMappingURL=1585694699034-identityPriority.js.map
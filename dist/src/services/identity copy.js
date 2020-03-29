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
const types_1 = require("../types");
const db_1 = __importDefault(require("../db"));
const identity_1 = require("../db/entities/identity");
const priority_1 = require("../db/entities/priority");
const identitypriority_1 = require("../db/entities/identitypriority");
class PriorityService {
    errorHandler(err) {
        switch (err.name) {
            case 'EntityNotFound':
                return new Error(types_1.ErrorEnum.PRIORITY_GRANT_NOT_FOUND);
            default:
                return new Error(types_1.ErrorEnum.UNKNOWN_ERROR);
        }
    }
    findGrantByMobileNo(priorityGrant, mobileNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`);
                const transaction = yield db_1.default.getTransaction();
                const identityRepository = transaction.manager.getRepository(identity_1.Identity);
                const identity = yield identityRepository.findOneOrFail({ where: { smsNumber: mobileNo } });
                console.log(`[priorityService::findGrantsByMobileNo] identity found`);
                const priorityRepository = transaction.manager.getRepository(priority_1.Priority);
                const priority = yield priorityRepository.findOne({ where: { grant: priorityGrant } });
                console.log(`[priorityService::findGrantsByMobileNo] priority found`);
                const identitypriorityRepository = transaction.manager.getRepository(identitypriority_1.Identitypriority);
                const identitypriority = yield identitypriorityRepository.findOne({
                    where: { identityId: identity.id, priority },
                });
                console.log(`[priorityService::findGrantsByMobileNo] identity-priority found`);
                console.log(`[priorityService::findGrantsByMobileNo] Priority Grant checked against identity.smsnumber`);
                return { priority: priorityGrant, valid: !!identitypriority };
            }
            catch (err) {
                console.error('[priorityService::findGrantsByMobileNo::Error] ' + err.message);
                throw this.errorHandler(err);
            }
        });
    }
}
exports.default = PriorityService;
//# sourceMappingURL=identity copy.js.map
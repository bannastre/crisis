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
const libphonenumber_js_1 = require("libphonenumber-js");
const types_1 = require("../types");
const db_1 = __importDefault(require("../db"));
const identity_1 = require("../db/entities/identity");
const priority_1 = require("../db/entities/priority");
const identitypriority_1 = require("../db/entities/identitypriority");
const helpers_1 = require("../helpers");
class PriorityService {
    errorHandler(err) {
        switch (err.name) {
            case 'EntityNotFound':
                return new helpers_1.FancyError(types_1.ErrorEnum.ENTITY_NOT_FOUND, 404);
            default:
                return new helpers_1.FancyError(types_1.ErrorEnum.UNKNOWN_ERROR);
        }
    }
    parseMobileNumber(phoneNumber) {
        try {
            console.log(`[priorityService::parseMobileNumber] parsing phone number`);
            const parsedMobileNumber = libphonenumber_js_1.parsePhoneNumberFromString(phoneNumber);
            const countryCode = parsedMobileNumber.countryCallingCode;
            const nationalNumber = parsedMobileNumber.nationalNumber;
            return { countryCode, number: nationalNumber };
        }
        catch (err) {
            console.log(`[priorityService::parseMobileNumber::Error] parsing phone number`);
            throw err;
        }
    }
    findGrantByMobileNo(priorityGrant, mobileNo) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[priorityService::findGrantsByMobileNo] Transaction Opening`);
            const transaction = yield db_1.default.getTransaction();
            try {
                console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`);
                const parsedMobileNumber = this.parseMobileNumber(mobileNo);
                const identityRepository = transaction.manager.getRepository(identity_1.Identity);
                const identities = yield identityRepository.find({
                    relations: ['smsNumber'],
                });
                // FIXME: This is should be handled by a Join through the ORM
                const identity = identities.filter((id) => {
                    return (id.smsNumber.number === parsedMobileNumber.number &&
                        id.smsNumber.countryCode === parsedMobileNumber.countryCode);
                })[0];
                if (!identity) {
                    throw new helpers_1.FancyError('Identity not found', 404, 'EntityNotFound');
                }
                console.log(`[priorityService::findGrantsByMobileNo] identity found`);
                const priorityRepository = transaction.manager.getRepository(priority_1.Priority);
                const priority = yield priorityRepository.findOne({ where: { grant: priorityGrant } });
                console.log(`[priorityService::findGrantsByMobileNo] priority found`);
                const identitypriorityRepository = transaction.manager.getRepository(identitypriority_1.Identitypriority);
                const identitypriority = yield identitypriorityRepository.findOne({
                    where: { identityId: identity, priority },
                });
                console.log(`[priorityService::findGrantsByMobileNo] Priority Grant checked against identity.smsnumber`);
                return { priority: priorityGrant, valid: !!identitypriority };
            }
            catch (err) {
                console.error('[priorityService::findGrantsByMobileNo::Error] ' + err.message);
                throw this.errorHandler(err);
            }
            finally {
                yield transaction.release();
                console.log(`[priorityService::findGrantsByMobileNo::Finally] Transaction released: ${transaction.isReleased}`);
            }
        });
    }
}
exports.default = PriorityService;
//# sourceMappingURL=priority.js.map
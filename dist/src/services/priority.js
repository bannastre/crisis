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
const helpers_1 = require("../helpers");
const enums_1 = require("../types/enums");
class PriorityService {
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
            throw new helpers_1.FancyError(types_1.ErrorEnum.INVALID_PHONE_NUMBER, 400);
        }
    }
    findGrantByMobileNo(priorityGrant, mobileNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const qr = yield db_1.default.getQueryRunner();
            try {
                console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`);
                const parsedMobileNumber = this.parseMobileNumber(mobileNo);
                const identityRepository = qr.manager.getRepository(identity_1.Identity);
                const identity = yield identityRepository
                    .createQueryBuilder('identity')
                    .innerJoinAndSelect('identity.smsNumber', 'smsNumber')
                    .innerJoinAndSelect('identity.identitypriorities', 'identitypriority')
                    .leftJoinAndSelect('identitypriority.priority', 'priority')
                    .where('smsNumber.number = :smsNumberNumber', {
                    smsNumberNumber: parsedMobileNumber.number,
                })
                    .andWhere('smsNumber.countryCode = :smsNumberCountryCode', {
                    smsNumberCountryCode: parsedMobileNumber.countryCode,
                })
                    .andWhere('priority.grant = :grant', {
                    grant: priorityGrant,
                })
                    .getOne();
                console.log(`[priorityService::findGrantsByMobileNo] Priority Grant checked`);
                const priority = identity ? identity.type : enums_1.IdentityTypeEnum.STANDARD;
                const valid = !!identity;
                return { priority, valid };
            }
            catch (err) {
                console.error('[priorityService::findGrantsByMobileNo::Error] ' + err.message);
                if (err instanceof helpers_1.FancyError) {
                    throw err;
                }
                throw new helpers_1.FancyError(types_1.ErrorEnum.UNKNOWN_ERROR);
            }
        });
    }
}
exports.default = PriorityService;
//# sourceMappingURL=priority.js.map
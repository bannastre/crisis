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
const phone_1 = __importDefault(require("phone"));
const types_1 = require("../types");
const helpers_1 = require("../helpers");
const enums_1 = require("../types/enums");
class PriorityService {
    constructor(identityRepository) {
        this.identityRepository = identityRepository;
    }
    parsePhoneNumber(phoneNumber) {
        try {
            console.log(`[priorityService::parsePhoneNumber] parsing phone number`);
            const validatedNumber = phone_1.default(phoneNumber, 'GB', true);
            const parsedPhoneNumber = libphonenumber_js_1.parsePhoneNumberFromString(validatedNumber[0]);
            const countryCode = parsedPhoneNumber ? parsedPhoneNumber.countryCallingCode : '+44';
            const nationalNumber = parsedPhoneNumber ? parsedPhoneNumber.nationalNumber : phoneNumber;
            return { countryCode, number: nationalNumber };
        }
        catch (err) {
            console.log(`[priorityService::parsePhoneNumber::Error] parsing phone number`);
            throw new helpers_1.FancyError(types_1.ErrorEnum.INVALID_PHONE_NUMBER, 400);
        }
    }
    findGrantByMobileNo(priorityGrant, mobileNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`[priorityService::findGrantsByMobileNo] Issuing request for priority by identity.smsNumber`);
                const parsedPhoneNumber = this.parsePhoneNumber(mobileNo);
                const identity = yield this.identityRepository.findByMobileAndGrant(parsedPhoneNumber, priorityGrant);
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
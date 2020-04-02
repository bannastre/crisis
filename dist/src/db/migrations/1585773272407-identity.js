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
const identity_1 = require("../entities/identity");
const address_1 = require("../entities/address");
const phoneNumber_1 = require("../entities/phoneNumber");
const __1 = __importDefault(require("../"));
const config_1 = __importDefault(require("../../config"));
const enums_1 = require("../../types/enums");
/**
 * This creates real identities for demo purposes
 */
class Identity1585773272407 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.default.initialiseDatabaseConnections();
            const transaction = yield __1.default.getTransaction();
            /**
             * Create an address
             */
            const addressRepository = transaction.manager.getRepository(address_1.Address);
            const addressEntity = addressRepository.create({
                addressLine1: '116 Old Street',
                addressLine2: '',
                addressLine3: '',
                region: 'Clerkenwell',
                city: 'London',
                country: 'UK',
                postcode: 'EC1V 9BG',
            });
            const savedAddress = yield addressRepository.save(addressEntity);
            /**
             * Create a phone number
             */
            const phoneNumberRepository = transaction.manager.getRepository(phoneNumber_1.Phonenumber);
            const smsNumberEntityIsmail = phoneNumberRepository.create({
                countryCode: '44',
                number: '7785300930',
            });
            const telNumberEntityIsmail = phoneNumberRepository.create({
                countryCode: '44',
                number: '2079460289',
            });
            const smsNumberEntityDaryl = phoneNumberRepository.create({
                countryCode: '44',
                number: '7540195547',
            });
            const telNumberEntityDaryl = phoneNumberRepository.create({
                countryCode: '44',
                number: '2079460289',
            });
            const savedsmsNumberIsmail = yield phoneNumberRepository.save(smsNumberEntityIsmail);
            const savedPhoneNumberIsmail = yield phoneNumberRepository.save(telNumberEntityIsmail);
            const savedsmsNumberDaryl = yield phoneNumberRepository.save(smsNumberEntityDaryl);
            const savedPhoneNumberDaryl = yield phoneNumberRepository.save(telNumberEntityDaryl);
            /**
             * Create an Identity
             */
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            /* tslint:disable object-literal-sort-keys */
            const identities = [
                {
                    firstName: 'Ismail',
                    lastName: 'Amla',
                    type: enums_1.IdentityTypeEnum.KEY_WORKER,
                    email: '',
                    smsNumber: savedsmsNumberIsmail,
                    telNumber: savedPhoneNumberIsmail,
                    dob: '28-10-1947',
                    address: savedAddress,
                },
                {
                    firstName: 'Daryl',
                    lastName: 'Rowland',
                    type: enums_1.IdentityTypeEnum.SHIELDED_PATIENT,
                    email: 'daryl@jigsaw.xyz',
                    smsNumber: savedsmsNumberDaryl,
                    telNumber: savedPhoneNumberDaryl,
                    dob: '28-10-1947',
                    address: savedAddress,
                },
            ];
            yield Promise.all(identities.map((identity) => __awaiter(this, void 0, void 0, function* () {
                const identityEntity = identityRepository.create(identity);
                return yield identityRepository.save(identityEntity);
            })));
            yield transaction.commitTransaction();
            yield __1.default.closeDatabaseConnections();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM ${config_1.default.connection.database}.dbo.[identity]`);
            yield queryRunner.query(`DELETE FROM ${config_1.default.connection.database}.dbo.[address]`);
            yield queryRunner.query(`DELETE FROM ${config_1.default.connection.database}.dbo.[phonenumber]`);
        });
    }
}
exports.Identity1585773272407 = Identity1585773272407;
//# sourceMappingURL=1585773272407-identity.js.map
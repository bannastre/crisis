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
/**
 * This creates a vulnerable person identity
 */
class Identity1585694690202 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.default.initialiseDatabaseConnections();
            const transaction = yield __1.default.getTransaction();
            /**
             * Create an address
             */
            const addressRepository = transaction.manager.getRepository(address_1.Address);
            const addressEntity = addressRepository.create({
                addressLine1: '136b Barking Rd',
                addressLine2: '',
                addressLine3: '',
                region: 'East Ham',
                city: 'London',
                country: 'UK',
                postcode: 'E6 3BD',
            });
            const savedAddress = yield addressRepository.save(addressEntity);
            /**
             * Create a phone number
             */
            const phoneNumberRepository = transaction.manager.getRepository(phoneNumber_1.Phonenumber);
            const phoneNumberEntity = phoneNumberRepository.create({
                countryCode: '44',
                number: '7909570705',
            });
            const phoneNumberEntity2 = phoneNumberRepository.create({
                countryCode: '44',
                number: '7909570705',
            });
            const savedPhoneNumber = yield phoneNumberRepository.save(phoneNumberEntity);
            const savedPhoneNumber2 = yield phoneNumberRepository.save(phoneNumberEntity2);
            /**
             * Create an Identity
             */
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            /* tslint:disable object-literal-sort-keys */
            const identities = [
                {
                    firstName: 'John',
                    lastName: 'Barton',
                    email: '',
                    smsNumber: savedPhoneNumber,
                    telNumber: savedPhoneNumber2,
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
        });
    }
}
exports.Identity1585694690202 = Identity1585694690202;
//# sourceMappingURL=1585694690202-identity.js.map
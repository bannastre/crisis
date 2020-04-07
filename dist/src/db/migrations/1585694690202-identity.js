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
const __1 = require("../");
const config_1 = __importDefault(require("../../config"));
const enums_1 = require("../../types/enums");
/**
 * This creates a vulnerable person identity
 */
// tslint:disable: variable-name
class Identity1585694690202 {
    constructor() {
        this.dbSchema = new __1.DbSchema(new __1.Db(config_1.default.connection));
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbSchema.initialiseDatabaseConnections();
            const transaction = yield this.dbSchema.getTransaction();
            /**
             * Create an address
             */
            const addressRepository = transaction.manager.getRepository(address_1.Address);
            const addressEntity_vp = addressRepository.create({
                addressLine1: '136b Barking Rd',
                addressLine2: '',
                addressLine3: '',
                region: 'East Ham',
                city: 'London',
                country: 'UK',
                postcode: 'E6 3BD',
            });
            const savedAddress_vp = yield addressRepository.save(addressEntity_vp);
            /**
             * Create a phone number
             */
            const phoneNumberRepository = transaction.manager.getRepository(phoneNumber_1.Phonenumber);
            const phoneNumberEntity_vp = phoneNumberRepository.create({
                countryCode: '44',
                number: '7911123456',
            });
            const telNumberEntity_vp = phoneNumberRepository.create({
                countryCode: '44',
                number: '1214960674',
            });
            const savedPhoneNumber_vp = yield phoneNumberRepository.save(phoneNumberEntity_vp);
            const savedTelNumber_vp = yield phoneNumberRepository.save(telNumberEntity_vp);
            /**
             * Create an Identity
             */
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            /* tslint:disable object-literal-sort-keys */
            const identities_vp = [
                {
                    firstName: 'John',
                    lastName: 'Barton',
                    type: enums_1.IdentityTypeEnum.SHIELDED_PATIENT,
                    email: '',
                    smsNumber: savedPhoneNumber_vp,
                    telNumber: savedTelNumber_vp,
                    dob: '28-10-1947',
                    address: savedAddress_vp,
                },
            ];
            yield Promise.all(identities_vp.map((id) => __awaiter(this, void 0, void 0, function* () {
                const identityEntity_vp = identityRepository.create(id);
                return yield identityRepository.save(identityEntity_vp);
            })));
            yield transaction.commitTransaction();
            yield this.dbSchema.closeDatabaseConnections();
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
exports.Identity1585694690202 = Identity1585694690202;
//# sourceMappingURL=1585694690202-identity.js.map
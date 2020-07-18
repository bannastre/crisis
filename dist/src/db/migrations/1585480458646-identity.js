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
 * This creates a key worker identity
 */
// tslint:disable: variable-name
class Identity1585480458646 {
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
            const addressEntity_kw = addressRepository.create({
                addressLine1: '1 Playfair Mansions',
                addressLine2: `Queen's Club Gardens`,
                addressLine3: '',
                region: 'Fulham',
                city: 'London',
                country: 'UK',
                postcode: 'W14 9TR',
            });
            const savedAddress_kw = yield addressRepository.save(addressEntity_kw);
            /**
             * Create a phone number
             */
            const phoneNumberRepository = transaction.manager.getRepository(phoneNumber_1.Phonenumber);
            const phoneNumberEntity = phoneNumberRepository.create({
                countryCode: '44',
                number: '7700900077',
            });
            const savedPhoneNumber = yield phoneNumberRepository.save(phoneNumberEntity);
            /**
             * Create an Identity
             */
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            /* tslint:disable object-literal-sort-keys */
            const identities_kw = [
                {
                    firstName: 'Kit',
                    lastName: 'Harper',
                    type: enums_1.IdentityTypeEnum.KEY_WORKER,
                    email: 'chris@jigsaw.xyz',
                    smsNumber: savedPhoneNumber,
                    telNumber: savedPhoneNumber,
                    dob: '26-10-1983',
                    address: savedAddress_kw,
                },
            ];
            yield Promise.all(identities_kw.map((id) => __awaiter(this, void 0, void 0, function* () {
                const identityEntity_kw = identityRepository.create(id);
                return yield identityRepository.save(identityEntity_kw);
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
exports.Identity1585480458646 = Identity1585480458646;
//# sourceMappingURL=1585480458646-identity.js.map
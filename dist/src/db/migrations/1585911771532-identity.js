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
 * This creates a Furlough Worker identit
 */
// tslint:disable: variable-name
class Identity1585911771532 {
    constructor() {
        this.dbSchema = new __1.DbSchema(new __1.Db(config_1.default.connection));
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbSchema.initialiseDatabaseConnections();
            const transaction = yield this.dbSchema.getTransaction();
            /**
             * Get an existing address
             */
            const addressRepository = transaction.manager.getRepository(address_1.Address);
            const addressEntity_fw = yield addressRepository.findOne({ where: { postcode: 'EC1V 9BG' } });
            /**
             * Create a phone number
             */
            const phoneNumberRepository = transaction.manager.getRepository(phoneNumber_1.Phonenumber);
            const smsNumberEntity_fw = phoneNumberRepository.create({
                countryCode: '44',
                number: '7755578054',
            });
            const telNumberEntity_fw = phoneNumberRepository.create({
                countryCode: '44',
                number: '2079460293',
            });
            const savedsmsNumber_fw = yield phoneNumberRepository.save(smsNumberEntity_fw);
            const savedtelNumber_fw = yield phoneNumberRepository.save(telNumberEntity_fw);
            /**
             * Create an Identity
             */
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            const identity = {
                firstName: 'Richard',
                lastName: 'Kofeve',
                type: enums_1.IdentityTypeEnum.FURLOUGH,
                email: 'rick@homeforsummer.co.uk',
                smsNumber: savedsmsNumber_fw,
                telNumber: savedtelNumber_fw,
                dob: '28-10-1964',
                address: addressEntity_fw,
            };
            const identityEntity = identityRepository.create(identity);
            yield identityRepository.save(identityEntity);
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
exports.Identity1585911771532 = Identity1585911771532;
//# sourceMappingURL=1585911771532-identity.js.map
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
 * This creates real identities for Sainsbury's demo purposes
 */
// tslint:disable: variable-name
class Identity1585814016605 {
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
            const addressEntity_sains = yield addressRepository.findOne({ where: { postcode: 'EC1V 9BG' } });
            /**
             * Create a phone number
             */
            const phoneNumberRepository = transaction.manager.getRepository(phoneNumber_1.Phonenumber);
            const smsNumberEntityMichele = phoneNumberRepository.create({
                countryCode: '44',
                number: '7841220846',
            });
            const telNumberEntityMichele = phoneNumberRepository.create({
                countryCode: '44',
                number: '2079460291',
            });
            const smsNumberEntityAndrew = phoneNumberRepository.create({
                countryCode: '44',
                number: '7979456456',
            });
            const telNumberEntityAndrew = phoneNumberRepository.create({
                countryCode: '44',
                number: '2079460292',
            });
            const savedsmsNumberMichele = yield phoneNumberRepository.save(smsNumberEntityMichele);
            const savedPhoneNumberMichele = yield phoneNumberRepository.save(telNumberEntityMichele);
            const savedsmsNumberAndrew = yield phoneNumberRepository.save(smsNumberEntityAndrew);
            const savedPhoneNumberAndrew = yield phoneNumberRepository.save(telNumberEntityAndrew);
            /**
             * Create an Identity
             */
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            /* tslint:disable object-literal-sort-keys */
            const identities = [
                {
                    firstName: 'Michele',
                    lastName: 'Swaine',
                    type: enums_1.IdentityTypeEnum.KEY_WORKER,
                    email: '',
                    smsNumber: savedsmsNumberMichele,
                    telNumber: savedPhoneNumberMichele,
                    dob: '28-10-1964',
                    address: addressEntity_sains,
                },
                {
                    firstName: 'Andrew',
                    lastName: 'Hogwood',
                    type: enums_1.IdentityTypeEnum.KEY_WORKER,
                    email: '',
                    smsNumber: savedsmsNumberAndrew,
                    telNumber: savedPhoneNumberAndrew,
                    dob: '28-10-1965',
                    address: addressEntity_sains,
                },
            ];
            yield Promise.all(identities.map((id) => __awaiter(this, void 0, void 0, function* () {
                const identityEntity = identityRepository.create(id);
                return yield identityRepository.save(identityEntity);
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
exports.Identity1585814016605 = Identity1585814016605;
//# sourceMappingURL=1585814016605-identity.js.map
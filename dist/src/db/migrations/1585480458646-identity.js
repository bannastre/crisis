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
const __1 = __importDefault(require("../"));
const config_1 = __importDefault(require("../../config"));
class Identity1585480458646 {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.default.initialiseDatabaseConnections();
            const transaction = yield __1.default.getTransaction();
            /**
             * Create an address
             */
            const addressRepository = transaction.manager.getRepository(address_1.Address);
            const addressEntity = addressRepository.create({
                addressLine1: '1 Playfair Mansions',
                addressLine2: `Queen's Club Gardens`,
                addressLine3: '',
                region: 'Fulham',
                city: 'London',
                country: 'UK',
                postcode: 'W14 9TR',
            });
            const savedAddress = yield addressRepository.save(addressEntity);
            /**
             * Create an Identity
             */
            const identityRepository = transaction.manager.getRepository(identity_1.Identity);
            /* tslint:disable object-literal-sort-keys */
            const identities = [
                {
                    firstName: 'Chris',
                    lastName: 'Harrop',
                    email: 'chris@jigsaw.xyz',
                    smsNumber: '+447843627130',
                    telNumber: '+447843627130',
                    dob: '28-10-1983',
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
exports.Identity1585480458646 = Identity1585480458646;
//# sourceMappingURL=1585480458646-identity.js.map
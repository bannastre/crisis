"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const __1 = require("../");
const identity_1 = require("../entities/identity");
const types_1 = require("../../types");
const helpers_1 = require("../../helpers");
let IdentityRepository = class IdentityRepository {
    constructor(dbSchema) {
        this.dbSchema = dbSchema;
    }
    findByMobileAndGrant(parsedPhoneNumber, priorityGrant) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`[identityRepository::findByMobileAndGrant] Starting query`);
                const qr = yield this.dbSchema.getQueryRunner();
                const identityRepository = qr.manager.getRepository(identity_1.Identity);
                priorityGrant = priorityGrant ? priorityGrant : types_1.GrantEnum.ANY;
                return yield identityRepository
                    .createQueryBuilder('identity')
                    .innerJoinAndSelect('identity.smsNumber', 'smsNumber')
                    .innerJoinAndSelect('identity.identitypriorities', 'identitypriority')
                    .leftJoinAndSelect('identitypriority.priority', 'priority')
                    .where('smsNumber.number = :smsNumberNumber', {
                    smsNumberNumber: parsedPhoneNumber.number,
                })
                    .andWhere('smsNumber.countryCode = :smsNumberCountryCode', {
                    smsNumberCountryCode: parsedPhoneNumber.countryCode,
                })
                    .andWhere('priority.grant = :grant', {
                    grant: priorityGrant,
                })
                    .getOne();
            }
            catch (err) {
                console.error('[identityRepository::findByMobileAndGrant::Error] ' + err);
                throw new helpers_1.FancyError(types_1.ErrorEnum.UNKNOWN_ERROR);
            }
        });
    }
};
IdentityRepository = __decorate([
    typeorm_1.EntityRepository(),
    __metadata("design:paramtypes", [__1.DbSchema])
], IdentityRepository);
exports.default = IdentityRepository;
//# sourceMappingURL=identity.js.map
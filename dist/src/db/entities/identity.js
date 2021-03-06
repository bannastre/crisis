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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const address_1 = require("./address");
const phoneNumber_1 = require("./phoneNumber");
const identitypriority_1 = require("./identitypriority");
const enums_1 = require("../../types/enums");
let Identity = class Identity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Identity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Identity.prototype, "type", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.JoinColumn(),
    typeorm_1.OneToOne(type => phoneNumber_1.Phonenumber, phonenumber => phonenumber.id),
    __metadata("design:type", phoneNumber_1.Phonenumber)
], Identity.prototype, "smsNumber", void 0);
__decorate([
    typeorm_1.ManyToOne(type => phoneNumber_1.Phonenumber, phonenumber => phonenumber.identities, { onDelete: 'CASCADE' }),
    __metadata("design:type", phoneNumber_1.Phonenumber)
], Identity.prototype, "telNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Identity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Identity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Identity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Identity.prototype, "dob", void 0);
__decorate([
    typeorm_1.ManyToOne(type => address_1.Address, address => address.identities, { onDelete: 'CASCADE' }),
    __metadata("design:type", address_1.Address)
], Identity.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(type => identitypriority_1.Identitypriority, identitypriority => identitypriority.identity),
    __metadata("design:type", Array)
], Identity.prototype, "identitypriorities", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Identity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", String)
], Identity.prototype, "updatedAt", void 0);
Identity = __decorate([
    typeorm_1.Entity()
], Identity);
exports.Identity = Identity;
//# sourceMappingURL=identity.js.map
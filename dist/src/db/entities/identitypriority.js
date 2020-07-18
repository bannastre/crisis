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
const priority_1 = require("./priority");
const identity_1 = require("./identity");
let Identitypriority = class Identitypriority {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Identitypriority.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => identity_1.Identity, identity => identity.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", identity_1.Identity)
], Identitypriority.prototype, "identity", void 0);
__decorate([
    typeorm_1.ManyToOne(type => priority_1.Priority, priority => priority.id),
    __metadata("design:type", priority_1.Priority)
], Identitypriority.prototype, "priority", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Identitypriority.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", String)
], Identitypriority.prototype, "updatedAt", void 0);
Identitypriority = __decorate([
    typeorm_1.Entity()
], Identitypriority);
exports.Identitypriority = Identitypriority;
//# sourceMappingURL=identitypriority.js.map
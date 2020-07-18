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
// tslint:disable: no-console only-arrow-functions
const cucumber_1 = require("cucumber");
const ts_sinon_1 = __importDefault(require("ts-sinon"));
const types_1 = require("../../../src/types");
const identity_1 = __importDefault(require("../../../src/db/repositories/identity"));
const identityMock = {
    id: 'C6FB423E-F36B-1410-83CA-00702EAE709F',
    type: types_1.IdentityTypeEnum.KEY_WORKER,
    firstName: 'Kit',
    lastName: 'Harper',
    email: 'chris@jigsaw.xyz',
    dob: '26-10-1983',
    createdAt: '2020-04-07T06:55:06.273Z',
    updatedAt: '2020-04-07T06:55:06.273Z',
    // @ts-ignore circular call for the identity this smsNumber belongs to
    smsNumber: {
        id: 'C1FB423E-F36B-1410-83CA-00702EAE709F',
        countryCode: '44',
        number: '7700900077',
        createdAt: '2020-04-07T06:55:06.250Z',
        updatedAt: '2020-04-07T06:55:06.250Z',
    },
    identitypriorities: [
        // @ts-ignore circular call for the identity this identityPriority belongs to
        {
            id: 'D9FB423E-F36B-1410-83CA-00702EAE709F',
            createdAt: '2020-04-07T06:55:06.830Z',
            updatedAt: '2020-04-07T06:55:06.830Z',
            priority: {
                id: 'C7FB423E-F36B-1410-83CA-00702EAE709F',
                grant: types_1.GrantEnum.FOOD_DELIVERY,
                description: 'Food delivery services',
                createdAt: '2020-04-07T06:55:06.490Z',
                updatedAt: '2020-04-07T06:55:06.490Z',
            },
        },
    ],
};
cucumber_1.Before(function () {
    // identityRepositoryStub - Stubs SQL interactions from TypeOrm to Database
    this.idRepositoryStub = ts_sinon_1.default.stub(identity_1.default.prototype, 'findByMobileAndGrant');
    this.idRepositoryStub.withArgs({ countryCode: '44', number: '7700900077' }, types_1.GrantEnum.FOOD_DELIVERY).returns(new Promise((resolve) => {
        resolve(identityMock);
    }));
    this.idRepositoryStub.withArgs({ countryCode: '44', number: '7700900077' }).returns(new Promise((resolve) => {
        resolve(identityMock);
    }));
    this.idRepositoryStub.withArgs({ countryCode: '44', number: '7700900077' }, 'not|known').returns(new Promise((resolve) => {
        resolve(undefined);
    }));
});
cucumber_1.Given('I have a known {string} query parameter', function (qp) {
    switch (qp) {
        case 'mobileNumber':
            this.qs = Object.assign({ mobileNumber: '+447700900077' }, this.qs);
            break;
        case 'priorityGrant':
            this.qs = Object.assign({ priorityGrant: types_1.GrantEnum.FOOD_DELIVERY }, this.qs);
            break;
        default:
            this.qs = null;
    }
});
cucumber_1.Given('I have an unknown {string} query parameter', function (qp) {
    switch (qp) {
        case 'mobileNumber':
            this.qs = Object.assign({ mobileNumber: '+447700900078' }, this.qs);
            break;
        case 'priorityGrant':
            this.qs = Object.assign({ priorityGrant: 'not|known' }, this.qs);
            break;
        default:
            this.qs = null;
    }
});
cucumber_1.Given('I have a {string} header', function (header) {
    switch (header) {
        case 'ocp-apim-subscription-key':
            this.headers = Object.assign({ ['ocp-apim-subscription-key']: 'any_mocked_header_value' }, this.headers);
            break;
        default:
            this.headers = null;
    }
});
cucumber_1.Then('I should get a response containing the attribute {string} with value {string}', function (attr, val) {
    this.response.body[attr].toString().should.eql(val);
});
cucumber_1.After(function () {
    return __awaiter(this, void 0, void 0, function* () {
        ts_sinon_1.default.restore();
    });
});
//# sourceMappingURL=priority.steps.js.map
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
const dotenv_1 = __importDefault(require("dotenv"));
const chai_1 = __importDefault(require("chai"));
const cucumber_1 = require("cucumber");
const request_promise_1 = __importDefault(require("request-promise"));
const uuid_1 = require("uuid");
const app_1 = require("../src/app");
const config_1 = __importDefault(require("../src/config"));
dotenv_1.default.config();
chai_1.default.should();
cucumber_1.BeforeAll(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield app_1.start();
    });
});
cucumber_1.Before(function (scenario) {
    console.log('\nScenario: ', scenario.pickle.name);
    this.headers = { 'x-correlation-id': uuid_1.v4(), 'x-person-id': uuid_1.v4() };
});
cucumber_1.When('I call {string} {string}', function (method, path) {
    return __awaiter(this, void 0, void 0, function* () {
        this.response = yield request_promise_1.default({
            body: this.body,
            form: this.form,
            headers: Object.assign(Object.assign({}, this.headers), { authorization: `Bearer someToken}` }),
            json: true,
            method,
            qs: this.qs,
            resolveWithFullResponse: true,
            simple: false,
            url: `${config_1.default.test.url}${path}`,
        });
    });
});
cucumber_1.Then('I should get the expected status code {int}', function (statusCode) {
    this.response.statusCode.should.equal(statusCode);
});
//# sourceMappingURL=common.steps.js.map
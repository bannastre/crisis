"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GrantEnum;
(function (GrantEnum) {
    GrantEnum["ANY"] = "any";
    GrantEnum["FINANCIAL_MORTGAGE_HOLIDAY"] = "financial|mortgage|holiday";
    GrantEnum["FOOD_DELIVERY"] = "food|delivery";
    GrantEnum["TRANSPORT_PUBLIC"] = "transport|public";
    GrantEnum["TRANSPORT_PRIVATE"] = "transport|private";
    GrantEnum["HEALTHCARE_MEDICINE_DISPENSARY"] = "healthcare|medicine|dispensary";
    GrantEnum["HEALTHCARE_CARE_VISITORS"] = "healthcare|care|visitors";
    GrantEnum["SCHOOLING_MEALS_AFTERSCHOOL"] = "schooling|meals|afterschool";
    GrantEnum["SCHOOLING_ACCESS"] = "schooling|access";
})(GrantEnum = exports.GrantEnum || (exports.GrantEnum = {}));
var ErrorEnum;
(function (ErrorEnum) {
    ErrorEnum["PRIORITY_GRANT_NOT_FOUND"] = "404 - Priority Grant Not Found";
    ErrorEnum["ENTITY_NOT_FOUND"] = "404 - Entity Not Found";
    ErrorEnum["INVALID_PHONE_NUMBER"] = "400 - Bad Request";
    ErrorEnum["UNKNOWN_ERROR"] = "500 - Unknown Server Error";
})(ErrorEnum = exports.ErrorEnum || (exports.ErrorEnum = {}));
var IdentityTypeEnum;
(function (IdentityTypeEnum) {
    IdentityTypeEnum["SHIELDED_PATIENT"] = "shielded patient";
    IdentityTypeEnum["KEY_WORKER"] = "key worker";
    IdentityTypeEnum["FURLOUGH"] = "furlough";
    IdentityTypeEnum["NONE"] = "none";
    IdentityTypeEnum["STANDARD"] = "standard";
})(IdentityTypeEnum = exports.IdentityTypeEnum || (exports.IdentityTypeEnum = {}));
//# sourceMappingURL=enums.js.map
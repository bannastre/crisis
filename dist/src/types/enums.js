"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GrantEnum;
(function (GrantEnum) {
    GrantEnum["FOOD_DELIVERY"] = "food|delivery";
    GrantEnum["TRANSPORT_PUBLIC"] = "transport|public";
    GrantEnum["TRANSPORT_PRIVATE"] = "transport|private";
    GrantEnum["HEALTHCARE_MEDECINE_DISPENSARY"] = "healthcare|medecine|dispensary";
    GrantEnum["HEALTHCARE_CARE_VISITORS"] = "healthcare|care|visitors";
    GrantEnum["SCHOOLING_MEALS_AFTERSCHOOL"] = "schooling|meals|afterschool";
    GrantEnum["SCHOOLING_ACCESS"] = "schooling|access";
})(GrantEnum = exports.GrantEnum || (exports.GrantEnum = {}));
var ErrorEnum;
(function (ErrorEnum) {
    ErrorEnum["PRIORITY_GRANT_NOT_FOUND"] = "404 - Priority Grant Not Found";
    ErrorEnum["ENTITY_NOT_FOUND"] = "404 - Entity Not Found";
    ErrorEnum["UNKNOWN_ERROR"] = "500 - Unknown Server Error";
})(ErrorEnum = exports.ErrorEnum || (exports.ErrorEnum = {}));
/**
 * Not currently used
 */
var IdentityTypeEnum;
(function (IdentityTypeEnum) {
    IdentityTypeEnum["SHIELDED_PATIENT"] = "shielded patient";
    IdentityTypeEnum["KEY_WORKER"] = "Key Worker";
})(IdentityTypeEnum = exports.IdentityTypeEnum || (exports.IdentityTypeEnum = {}));
//# sourceMappingURL=enums.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = require("http2");
class PriorityController {
    constructor(priorityService) {
        this.priorityService = priorityService;
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { priorityGrant, mobileNumber } = req.query;
                console.log(`[priorityController::get] Searching for ${JSON.stringify(priorityGrant)} linked to smsNumber ${JSON.stringify(mobileNumber)}`);
                const grant = yield this.priorityService.findGrantByMobileNo(priorityGrant, mobileNumber);
                console.log(`[priorityController::get] Complete - returning ${JSON.stringify(grant)}`);
                res.status(http2_1.constants.HTTP_STATUS_OK).json(grant);
            }
            catch (err) {
                console.error('[priorityController::get] ' + err.message);
                next(err);
            }
        });
    }
}
exports.default = PriorityController;
//# sourceMappingURL=priority.js.map
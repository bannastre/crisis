"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const http2_1 = require("http2");
const mobileNumberArray = ['07843627130'];
class PriorityController {
    constructor() {
        this.get = (req, res, next) => {
            try {
                const { priorityGrant, mobileNumber } = req.query;
                let grant;
                switch (priorityGrant) {
                    case types_1.GrantEnum.FOOD_DELIVERY:
                        if (mobileNumberArray.includes(mobileNumber)) {
                            grant = { priority: types_1.GrantEnum.FOOD_DELIVERY, valid: true };
                        }
                        else {
                            grant = { priority: types_1.GrantEnum.FOOD_DELIVERY, valid: false };
                        }
                        break;
                    default:
                        throw new Error(types_1.ErrorEnum.PRIORITY_GRANT_NOT_FOUND);
                }
                res.status(http2_1.constants.HTTP_STATUS_OK).json(grant);
            }
            catch (err) {
                switch (err.message) {
                    case types_1.ErrorEnum.PRIORITY_GRANT_NOT_FOUND:
                        res.status(404).end();
                        break;
                    default:
                        res.status(500).end();
                }
            }
        };
    }
}
exports.default = PriorityController;
//# sourceMappingURL=priority.js.map
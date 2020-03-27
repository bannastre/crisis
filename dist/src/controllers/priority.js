"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const http2_1 = require("http2");
const mobileNumberArray = ['07843627130'];
class PriorityController {
    constructor() {
        this.get = (req, res, next) => {
            try {
                const { priorityPermission, mobileNumber } = req.query;
                let grant;
                switch (priorityPermission) {
                    case types_1.GrantEnum.FOOD_DELIVERY:
                        if (mobileNumberArray.includes(mobileNumber)) {
                            grant = { grant: types_1.GrantEnum.FOOD_DELIVERY, priority: true };
                        }
                        else {
                            grant = { grant: types_1.GrantEnum.FOOD_DELIVERY, priority: false };
                        }
                        break;
                    default:
                        throw new Error(types_1.ErrorEnum.PRIORITY_PERMISSION_NOT_FOUND);
                }
                res.status(http2_1.constants.HTTP_STATUS_OK).json(grant);
            }
            catch (err) {
                switch (err.message) {
                    case types_1.ErrorEnum.PRIORITY_PERMISSION_NOT_FOUND:
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
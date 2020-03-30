"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = require("http2");
class BaseController {
    notImplemented(req, res, next) {
        try {
            res.status(http2_1.constants.HTTP_STATUS_NOT_IMPLEMENTED).send();
            return next();
        }
        catch (err) {
            return next(err);
        }
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.js.map
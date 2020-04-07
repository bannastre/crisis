"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const healthcheck_1 = require("./healthcheck");
const priority_1 = require("./priority");
const indexRouter = (dbSchema) => {
    const router = express_1.default.Router();
    router.use('/healthcheck', healthcheck_1.healthcheckRouter);
    router.use('/priority', priority_1.priorityRouter(dbSchema));
    return router;
};
exports.default = indexRouter;
//# sourceMappingURL=index.js.map
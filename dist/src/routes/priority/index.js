"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const priority_1 = __importDefault(require("../../services/priority"));
const identity_1 = __importDefault(require("../../db/repositories/identity"));
const priorityRouter = (dbSchema) => {
    const thisRouter = express_1.default.Router();
    const identityRepository = new identity_1.default(dbSchema);
    const priorityService = new priority_1.default(identityRepository);
    const priorityController = new controllers_1.PriorityController(priorityService);
    thisRouter.get('/', priorityController.get);
    return thisRouter;
};
exports.priorityRouter = priorityRouter;
//# sourceMappingURL=index.js.map
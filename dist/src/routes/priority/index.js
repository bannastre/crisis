"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
exports.priorityRouter = express_1.default.Router();
const priorityController = new controllers_1.PriorityController();
exports.priorityRouter.get('/', priorityController.get);
//# sourceMappingURL=index.js.map
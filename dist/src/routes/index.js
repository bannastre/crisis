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
const express_1 = __importDefault(require("express"));
const http2_1 = require("http2");
const config_1 = __importDefault(require("../../config"));
const priority_1 = require("./priority");
const router = express_1.default.Router();
router.get('/healthcheck/ping', (_, res) => res.status(200).send({ message: 'ok' }));
router.get('/healthcheck/ready', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (config_1.default.env === 'test') {
            res.status(http2_1.constants.HTTP_STATUS_OK).send({
                message: 'ok',
            });
        }
        else {
            res.status(http2_1.constants.HTTP_STATUS_OK).send({
                // TODO: test ping from dependencies
                message: 'ok',
            });
        }
    }
    catch (error) {
        res.status(http2_1.constants.HTTP_STATUS_SERVICE_UNAVAILABLE).send();
    }
}));
router.use('/priority', priority_1.priorityRouter);
exports.default = router;
//# sourceMappingURL=index.js.map
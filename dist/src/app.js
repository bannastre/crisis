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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("../config"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.debug('configuring using....');
        console.debug(config_1.default);
        app.disable('x-powered-by');
        app.use(cors_1.default());
        app.use(morgan_1.default('dev'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(cookie_parser_1.default());
        // TODO: security
        // TODO: schema validation
        app.use(config_1.default.basePath, routes_1.default);
        app.use((err, _, __, next) => {
            console.error(err);
            next(err);
        });
        return app.listen(config_1.default.port, () => {
            console.log(`Express server listening on port ${config_1.default.port} in ${config_1.default.env} mode with base path of ${config_1.default.basePath}.`);
        });
    });
}
exports.start = start;
exports.default = app;
//# sourceMappingURL=app.js.map
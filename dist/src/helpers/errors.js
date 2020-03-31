"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FancyError extends Error {
    constructor(args) {
        super(args);
        this.name = 'FancyError';
    }
}
exports.default = FancyError;
//# sourceMappingURL=errors.js.map
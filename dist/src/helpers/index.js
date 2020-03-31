"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FancyError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'FancyError';
        this.status = status || 500;
    }
}
exports.FancyError = FancyError;
//# sourceMappingURL=index.js.map
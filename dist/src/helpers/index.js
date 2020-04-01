"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FancyError extends Error {
    constructor(err, message, status) {
        super(message);
        this.name = err.name || 'FancyError';
        this.status = status || 500;
        this.stack = err.stack || '';
    }
}
exports.FancyError = FancyError;
//# sourceMappingURL=index.js.map
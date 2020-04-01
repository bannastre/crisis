"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FancyError extends Error {
    constructor(message, status, err) {
        super(message);
        this.name = err ? err.name : 'Error';
        this.status = status || 500;
        this.stack = err ? err.stack : '';
    }
}
exports.FancyError = FancyError;
//# sourceMappingURL=index.js.map
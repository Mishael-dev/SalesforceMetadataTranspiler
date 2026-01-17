"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceMetadataTranspiler = void 0;
const validator_1 = require("./validator");
class SalesforceMetadataTranspiler {
    validator;
    config;
    constructor(config) {
        this.config = config;
        this.validator = new validator_1.Validator();
    }
    async transpile(input) {
        return this.validator.validate(input);
    }
}
exports.SalesforceMetadataTranspiler = SalesforceMetadataTranspiler;
//# sourceMappingURL=index.js.map
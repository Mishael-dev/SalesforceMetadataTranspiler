"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const _1_structuralValidator_1 = require("./1-structuralValidator");
class Validator {
    validate(schema) {
        const structuralValidator = new _1_structuralValidator_1.StructuralValidator();
        const structuralValidationResult = structuralValidator.validate(schema);
        const result = {
            structuralValidationResult,
        };
        return result;
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map
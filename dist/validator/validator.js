"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const _1_structuralValidator_1 = require("./1-structuralValidator");
const _2_semanticValidator_1 = require("./2-semanticValidator");
class Validator {
    validate(schema) {
        const structuralValidator = new _1_structuralValidator_1.StructuralValidator();
        const semanticValidator = (0, _2_semanticValidator_1.createSemanticValidator)();
        const structuralValidationResult = structuralValidator.validate(schema);
        if (!structuralValidationResult.success) {
            console.error("Structural validation failed", structuralValidationResult);
            return structuralValidationResult;
        }
        const semanticResult = semanticValidator.validate(structuralValidationResult.normalizedData);
        return semanticResult;
    }
}
exports.Validator = Validator;

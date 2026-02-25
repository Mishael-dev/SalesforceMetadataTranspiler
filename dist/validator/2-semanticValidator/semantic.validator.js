"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticValidator = void 0;
class SemanticValidator {
    constructor() {
        this.validators = [];
    }
    registerValidator(validator) {
        this.validators.push(validator);
    }
    validate(schema) {
        // Type guard
        if (!Array.isArray(schema)) {
            return {
                success: false,
                errors: [
                    {
                        level: 1,
                        message: "Schema must be an array of metadata items",
                        path: [],
                    },
                ],
            };
        }
        const items = schema;
        const errors = [];
        // Validate each item
        for (const item of items) {
            const validator = this.validators.find((v) => v.supports(item));
            if (!validator) {
                errors.push({
                    level: 1,
                    message: `No validator found for item type: ${item.type}`,
                    path: [item.fullName || "<unknown>"],
                });
                continue;
            }
            // Run the validator and collect errors
            const itemErrors = validator.validate(item, items);
            errors.push(...itemErrors);
        }
        if (errors.length > 0) {
            return {
                success: false,
                errors
            };
        }
        return {
            success: true,
            errors: [],
            normalizedData: items,
        };
    }
}
exports.SemanticValidator = SemanticValidator;

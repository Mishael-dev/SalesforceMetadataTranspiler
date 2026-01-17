"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidator = void 0;
class ZodValidator {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    validate(input) {
        const result = this.schema.safeParse(input); // returns { success: boolean, data?, error? }
        if (!result.success) {
            // Map Zod issues to your imported ValidationError type
            const errors = result.error.issues.map(issue => ({
                level: 1, // Level 1 = Structural Validation
                code: issue.code,
                message: issue.message,
                path: issue.path.map(String),
            }));
            return {
                success: false,
                errors,
            };
        }
        return {
            success: true,
            errors: [],
            normalizedData: result.data,
        };
    }
}
exports.ZodValidator = ZodValidator;
//# sourceMappingURL=zodValidator.js.map
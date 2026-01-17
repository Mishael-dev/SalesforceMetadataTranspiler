"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructuralValidator = void 0;
const schemas_1 = require("../../schemas");
class StructuralValidator {
    constructor() { }
    validate(schema) {
        const result = schemas_1.MetadataEnvelopeSchema.safeParse(schema);
        if (!result.success) {
            const errors = result.error.issues.map((err) => ({
                level: 1,
                message: err.message,
                path: err.path,
            }));
            console.log(errors);
            return { success: false, errors };
        }
        return { success: true, errors: [], normalizedData: result.data };
    }
}
exports.StructuralValidator = StructuralValidator;
//# sourceMappingURL=structural.validator.js.map
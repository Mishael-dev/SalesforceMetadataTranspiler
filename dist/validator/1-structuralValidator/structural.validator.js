import { MetadataEnvelopeSchema } from "../../schemas";
export class StructuralValidator {
    constructor() { }
    validate(schema) {
        const result = MetadataEnvelopeSchema.safeParse(schema);
        if (!result.success) {
            const errors = result.error.issues.map((err) => ({
                level: 1,
                message: err.message,
                path: err.path,
            }));
            console.log("errors", errors);
            return { success: false, errors };
        }
        return { success: true, errors: [], normalizedData: result.data };
    }
}

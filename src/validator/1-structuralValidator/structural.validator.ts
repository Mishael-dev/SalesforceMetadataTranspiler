import { MetadataEnvelopeSchema } from "../../schemas";
import { ValidationError } from "../../types/validationResult";

export class StructuralValidator {
  
  constructor() {}

  public validate(schema: unknown) {
    const result = MetadataEnvelopeSchema.safeParse(schema);

    if (!result.success) {
      const errors: ValidationError[] = result.error.issues.map((err) => ({
        level: 1,
        message: err.message,
        path: err.path,
      }));

      console.log(errors);
      return { success: false as false, errors };
    }

    return { success: true as true, errors: [], normalizedData: result.data };
  }
}

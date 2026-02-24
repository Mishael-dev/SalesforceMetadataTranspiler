import { StructuralValidator } from "./1-structuralValidator";
import { createSemanticValidator } from "./2-semanticValidator";
import { ValidationResult } from "../types/validationResult";
import { MetadataEnvelope } from "../schemas";

export class Validator {
  public validate(schema: unknown) {
    const structuralValidator = new StructuralValidator();
    const semanticValidator = createSemanticValidator()

    const structuralValidationResult: ValidationResult<MetadataEnvelope> =
      structuralValidator.validate(schema);
    const semanticResult = semanticValidator.validate(
      structuralValidationResult.normalizedData,
    );

    console.log("semanticResult", semanticResult);

    if (semanticResult.success) {
      console.log("Semantic validation passed");
    }

    const result = semanticResult;

    return result;
  }
}

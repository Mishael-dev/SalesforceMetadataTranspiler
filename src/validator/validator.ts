import { StructuralValidator } from "./1-structuralValidator";
import { createSemanticValidator } from "./2-semanticValidator";
import { ValidationResult } from "../types/validationResult";
import { MetadataEnvelope } from "../schemas";

export class Validator {
  public validate(schema: unknown) {
    const structuralValidator = new StructuralValidator();
    const semanticValidator = createSemanticValidator();

    const structuralValidationResult: ValidationResult<MetadataEnvelope> =
      structuralValidator.validate(schema);

    if (!structuralValidationResult.success) {
      console.error(
        "Structural validation failed",
        structuralValidationResult,
      );
      return structuralValidationResult;
    }

    const semanticResult = semanticValidator.validate(
      structuralValidationResult.normalizedData,
    );

     return semanticResult;
  }
}

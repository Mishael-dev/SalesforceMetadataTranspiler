import { StructuralValidator } from "./1-structuralValidator";
import { ValidationResult } from "../types/validationResult";

export class Validator {
  public validate(schema: unknown) {
    const structuralValidator = new StructuralValidator();
    const structuralValidationResult: ValidationResult =
      structuralValidator.validate(schema);
    const result = structuralValidationResult;

    return result;
  }
}

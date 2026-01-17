import { ValidationResult } from "../types/validationResult";
export declare class Validator {
    validate(schema: unknown): {
        structuralValidationResult: ValidationResult;
    };
}

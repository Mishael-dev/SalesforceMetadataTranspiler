import { StructuralValidator } from "./1-structuralValidator";
export class Validator {
    validate(schema) {
        const structuralValidator = new StructuralValidator();
        const structuralValidationResult = structuralValidator.validate(schema);
        const result = structuralValidationResult;
        return result;
    }
}

import { ValidationError } from "../../../types/validationResult";
import { ValidationRule } from "../types";
import { MetadataValidator } from "../types";
import { CustomObject } from "../../../xmlGenerator/types";
export declare class CustomObjectSemanticValidator implements MetadataValidator {
    private standardObjects;
    private rules;
    constructor(standardObjects?: Set<string>);
    addRule(rule: ValidationRule): void;
    supports(item: CustomObject): boolean;
    validate(item: CustomObject, allItems: CustomObject[]): ValidationError[];
    private buildContext;
}
//# sourceMappingURL=index.d.ts.map
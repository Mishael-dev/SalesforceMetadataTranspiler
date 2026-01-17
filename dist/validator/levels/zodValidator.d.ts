import { ZodType } from "zod";
import { ValidationResult } from "../types/validationResult";
export declare class ZodValidator<T> {
    private schema;
    constructor(schema: ZodType<T>);
    validate(input: unknown): ValidationResult<T>;
}

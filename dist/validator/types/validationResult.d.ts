import { ValidationError } from "./validationError";
export interface ValidationResult<T = unknown> {
    success: boolean;
    /** Empty if success === true */
    errors: ValidationError[];
    /** Only present if success === true */
    normalizedData?: T;
}

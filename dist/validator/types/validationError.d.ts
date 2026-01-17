import { ValidationLevel } from "./validationLevel";
export interface ValidationError {
    level: ValidationLevel;
    /** Machine-readable identifier (for UI, i18n, analytics) */
    code: string;
    /** Human-readable explanation */
    message: string;
    /** Path to the offending value (JSON path semantics) */
    path?: Array<string | number>;
}

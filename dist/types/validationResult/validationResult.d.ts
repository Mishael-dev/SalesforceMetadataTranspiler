export type ValidationLevel = 1 | 2 | 3 | 4;
export interface ValidationError {
    level: ValidationLevel;
    message: string;
    path?: unknown;
}
export type ValidationResult<T = unknown> = {
    success: true;
    errors: ValidationError[];
    normalizedData?: T;
} | {
    success: false;
    errors: ValidationError[];
    normalizedData?: never;
};

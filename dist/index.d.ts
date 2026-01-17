import { TranspilerConfig } from "./config/transpilerConfig";
import { ValidationResult } from "./validator/types/validationResult";
declare class SalesforceMetadataTranspiler {
    private readonly validator;
    private readonly config;
    constructor(config: TranspilerConfig);
    transpile(input: unknown): Promise<ValidationResult<any>>;
}
export { SalesforceMetadataTranspiler };

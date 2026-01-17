import { ValidatedSchema } from './metadataTypes';
/**
 * SchemaValidator - Validates JSON schemas against Zod schemas and Salesforce business rules
 */
export declare class SchemaValidator {
    private errors;
    private warnings;
    /**
     * Main validation method
     */
    validate(jsonInput: unknown): ValidatedSchema;
    /**
     * Step 1: Parse JSON with Zod schemas
     */
    private parseWithZod;
    /**
     * Step 2: Validate business rules
     */
    private validateBusinessRules;
    /**
     * Step 3: Validate cross-object relationships
     */
    private validateCrossObjectRelationships;
    /**
     * Validate duplicate object names
     */
    private validateDuplicateObjectNames;
    /**
     * Validate object naming conventions
     */
    private validateObjectNaming;
    /**
     * Validate object features
     */
    private validateObjectFeatures;
    /**
     * Validate name field
     */
    private validateNameField;
    /**
     * Validate sharing model based on Master-Detail relationships
     */
    private validateSharingModel;
    /**
     * Validate field naming conventions
     */
    private validateFieldNaming;
    /**
     * Validate duplicate field names within an object
     */
    private validateDuplicateFieldNames;
    /**
     * Validate field dependencies (tracking, etc.)
     */
    private validateFieldDependencies;
    /**
     * Validate Master-Detail field rules
     */
    private validateMasterDetailRules;
    /**
     * Validate junction object rules
     */
    private validateJunctionObjectRules;
    /**
     * Validate Roll-Up Summary field rules
     */
    private validateSummaryFieldRules;
    /**
     * Validate scale <= precision for Number, Currency, Percent fields
     */
    private validateScalePrecisionRules;
    /**
     * Helper: Check if field is a relationship field
     */
    private isRelationshipField;
}

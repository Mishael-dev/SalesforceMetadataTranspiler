"use strict";
// src/schemas/SchemaValidator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidator = void 0;
const zod_1 = require("zod");
const zodDefinition_1 = require("./zodDefinition");
/**
 * SchemaValidator - Validates JSON schemas against Zod schemas and Salesforce business rules
 */
class SchemaValidator {
    errors = [];
    warnings = [];
    /**
     * Main validation method
     */
    validate(jsonInput) {
        this.errors = [];
        this.warnings = [];
        // Step 1: Parse with Zod schemas
        const parseResult = this.parseWithZod(jsonInput);
        if (!parseResult.success || !parseResult.data) {
            return {
                objects: [],
                errors: this.errors,
                warnings: this.warnings,
                isValid: false,
            };
        }
        const objects = parseResult.data;
        // Step 2: Validate business rules
        this.validateBusinessRules(objects);
        // Step 3: Validate cross-object relationships
        this.validateCrossObjectRelationships(objects);
        return {
            objects,
            errors: this.errors,
            warnings: this.warnings,
            isValid: this.errors.length === 0,
        };
    }
    /**
     * Step 1: Parse JSON with Zod schemas
     */
    parseWithZod(jsonInput) {
        try {
            const parsed = zodDefinition_1.schemaArraySchema.parse(jsonInput);
            return { success: true, data: parsed };
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                error.issues.forEach((err) => {
                    this.errors.push({
                        type: 'error',
                        code: 'SCHEMA_VALIDATION_ERROR',
                        message: err.message,
                        path: err.path.join('.'),
                    });
                });
            }
            else {
                this.errors.push({
                    type: 'error',
                    code: 'UNKNOWN_VALIDATION_ERROR',
                    message: error instanceof Error ? error.message : 'Unknown error occurred',
                });
            }
            return { success: false };
        }
    }
    /**
     * Step 2: Validate business rules
     */
    validateBusinessRules(objects) {
        // Check for duplicate object names
        this.validateDuplicateObjectNames(objects);
        // Validate each object
        objects.forEach((obj) => {
            this.validateObjectNaming(obj);
            this.validateObjectFeatures(obj);
            this.validateNameField(obj);
            this.validateSharingModel(obj);
            if (obj.fields) {
                this.validateFieldNaming(obj);
                this.validateDuplicateFieldNames(obj);
                this.validateFieldDependencies(obj);
                this.validateMasterDetailRules(obj);
                this.validateJunctionObjectRules(obj);
                this.validateSummaryFieldRules(obj);
                this.validateScalePrecisionRules(obj);
            }
        });
    }
    /**
     * Step 3: Validate cross-object relationships
     */
    validateCrossObjectRelationships(objects) {
        const objectNames = new Set(objects.map((obj) => obj.fullName));
        objects.forEach((obj) => {
            if (!obj.fields)
                return;
            obj.fields.forEach((field) => {
                // Check if relationship fields reference existing objects
                if (this.isRelationshipField(field)) {
                    const referenceTo = field.referenceTo;
                    // Allow references to standard objects (no __c suffix) and custom objects in the schema
                    const isStandardObject = !referenceTo.endsWith('__c');
                    const isDefinedCustomObject = objectNames.has(referenceTo);
                    if (!isStandardObject && !isDefinedCustomObject) {
                        this.warnings.push({
                            type: 'warning',
                            code: 'MISSING_REFERENCED_OBJECT',
                            message: `Field '${field.fullName}' references object '${referenceTo}' which is not defined in this schema. Ensure this object exists in your Salesforce org.`,
                            objectName: obj.fullName,
                            fieldName: field.fullName,
                        });
                    }
                }
                // Validate Hierarchy fields reference their own object
                if (field.type === 'Hierarchy') {
                    const hierarchyField = field;
                    if (hierarchyField.referenceTo !== obj.fullName) {
                        this.errors.push({
                            type: 'error',
                            code: 'INVALID_HIERARCHY_REFERENCE',
                            message: `Hierarchy field '${field.fullName}' must reference its own object ('${obj.fullName}'), but references '${hierarchyField.referenceTo}'`,
                            objectName: obj.fullName,
                            fieldName: field.fullName,
                        });
                    }
                }
            });
        });
    }
    /**
     * Validate duplicate object names
     */
    validateDuplicateObjectNames(objects) {
        const nameCount = new Map();
        objects.forEach((obj) => {
            const count = nameCount.get(obj.fullName) || 0;
            nameCount.set(obj.fullName, count + 1);
        });
        nameCount.forEach((count, name) => {
            if (count > 1) {
                this.errors.push({
                    type: 'error',
                    code: 'DUPLICATE_OBJECT_NAME',
                    message: `Object name '${name}' is defined ${count} times. Each object must have a unique name.`,
                    objectName: name,
                });
            }
        });
    }
    /**
     * Validate object naming conventions
     */
    validateObjectNaming(obj) {
        // Length already validated by Zod (max 40)
        // Pattern already validated by Zod (ends with __c)
        // Check if label and pluralLabel are meaningful
        if (obj.label === obj.fullName) {
            this.warnings.push({
                type: 'warning',
                code: 'LABEL_MATCHES_API_NAME',
                message: `Object label is the same as API name. Consider using a more user-friendly label.`,
                objectName: obj.fullName,
            });
        }
    }
    /**
     * Validate object features
     */
    validateObjectFeatures(obj) {
        const features = obj.features;
        if (!features)
            return;
        // Enterprise features must be enabled together
        const enterpriseFeatures = [
            features.enableBulkApi,
            features.enableSharing,
            features.enableStreamingApi,
        ];
        const enabledCount = enterpriseFeatures.filter((f) => f === true).length;
        const disabledCount = enterpriseFeatures.filter((f) => f === false).length;
        if (enabledCount > 0 && disabledCount > 0) {
            this.errors.push({
                type: 'error',
                code: 'INCONSISTENT_ENTERPRISE_FEATURES',
                message: `Enterprise features (enableBulkApi, enableSharing, enableStreamingApi) must all be enabled or disabled together.`,
                objectName: obj.fullName,
            });
        }
    }
    /**
     * Validate name field
     */
    validateNameField(obj) {
        const nameField = obj.nameField;
        if (nameField.type === 'AutoNumber') {
            if (!nameField.displayFormat) {
                this.errors.push({
                    type: 'error',
                    code: 'MISSING_DISPLAY_FORMAT',
                    message: `AutoNumber name field must have a displayFormat property.`,
                    objectName: obj.fullName,
                });
            }
        }
    }
    /**
     * Validate sharing model based on Master-Detail relationships
     */
    validateSharingModel(obj) {
        if (!obj.fields)
            return;
        const masterDetailFields = obj.fields.filter((f) => f.type === 'MasterDetail');
        if (masterDetailFields.length > 0 && obj.sharingModel !== 'ControlledByParent') {
            this.errors.push({
                type: 'error',
                code: 'INVALID_SHARING_MODEL',
                message: `Object with Master-Detail relationship(s) must have sharingModel='ControlledByParent', but has '${obj.sharingModel}'.`,
                objectName: obj.fullName,
            });
        }
    }
    /**
     * Validate field naming conventions
     */
    validateFieldNaming(obj) {
        obj.fields.forEach((field) => {
            // Length and pattern already validated by Zod
            if (field.label === field.fullName) {
                this.warnings.push({
                    type: 'warning',
                    code: 'FIELD_LABEL_MATCHES_API_NAME',
                    message: `Field label is the same as API name. Consider using a more user-friendly label.`,
                    objectName: obj.fullName,
                    fieldName: field.fullName,
                });
            }
        });
    }
    /**
     * Validate duplicate field names within an object
     */
    validateDuplicateFieldNames(obj) {
        const fieldNameCount = new Map();
        obj.fields.forEach((field) => {
            const count = fieldNameCount.get(field.fullName) || 0;
            fieldNameCount.set(field.fullName, count + 1);
        });
        fieldNameCount.forEach((count, name) => {
            if (count > 1) {
                this.errors.push({
                    type: 'error',
                    code: 'DUPLICATE_FIELD_NAME',
                    message: `Field name '${name}' is defined ${count} times in object. Each field must have a unique name.`,
                    objectName: obj.fullName,
                    fieldName: name,
                });
            }
        });
    }
    /**
     * Validate field dependencies (tracking, etc.)
     */
    validateFieldDependencies(obj) {
        obj.fields.forEach((field) => {
            // trackHistory requires object enableHistory
            if (field.trackHistory && !obj.features?.enableHistory) {
                this.errors.push({
                    type: 'error',
                    code: 'HISTORY_TRACKING_NOT_ENABLED',
                    message: `Field '${field.fullName}' has trackHistory=true, but object does not have enableHistory=true.`,
                    objectName: obj.fullName,
                    fieldName: field.fullName,
                });
            }
            // trackFeedHistory requires object enableFeeds
            if (field.trackFeedHistory && !obj.features?.enableFeeds) {
                this.errors.push({
                    type: 'error',
                    code: 'FEED_TRACKING_NOT_ENABLED',
                    message: `Field '${field.fullName}' has trackFeedHistory=true, but object does not have enableFeeds=true.`,
                    objectName: obj.fullName,
                    fieldName: field.fullName,
                });
            }
        });
    }
    /**
     * Validate Master-Detail field rules
     */
    validateMasterDetailRules(obj) {
        obj.fields.forEach((field) => {
            if (field.type === 'MasterDetail') {
                const mdField = field;
                // Master-Detail cannot have defaultValue (it's always required)
                // This is implicitly handled since MasterDetail interface doesn't have defaultValue
                // If reparentableMasterDetail is true, there should be a warning
                if (mdField.reparentableMasterDetail) {
                    this.warnings.push({
                        type: 'warning',
                        code: 'REPARENTABLE_MASTER_DETAIL',
                        message: `Master-Detail field '${field.fullName}' is reparentable. This allows child records to be reparented, which may have data implications.`,
                        objectName: obj.fullName,
                        fieldName: field.fullName,
                    });
                }
            }
            if (field.type === 'Lookup') {
                const lookupField = field;
                // Lookup fields cannot have defaultValue in Salesforce
                // This would need to be checked if we added defaultValue to LookupField interface
            }
        });
    }
    /**
     * Validate junction object rules
     */
    validateJunctionObjectRules(obj) {
        if (!obj.fields)
            return;
        const masterDetailFields = obj.fields.filter((f) => f.type === 'MasterDetail');
        // If object has exactly 2 Master-Detail fields, it's a junction object
        if (masterDetailFields.length === 2) {
            const orders = masterDetailFields
                .map((f) => f.relationshipOrder)
                .filter((o) => o !== undefined);
            // Check if both have relationshipOrder defined
            if (orders.length !== 2) {
                this.errors.push({
                    type: 'error',
                    code: 'JUNCTION_OBJECT_MISSING_ORDER',
                    message: `Junction object '${obj.fullName}' has 2 Master-Detail fields but not all have relationshipOrder defined. Both must have relationshipOrder (0 and 1).`,
                    objectName: obj.fullName,
                });
            }
            else {
                // Check if orders are 0 and 1
                const sortedOrders = [...orders].sort();
                if (sortedOrders[0] !== 0 || sortedOrders[1] !== 1) {
                    this.errors.push({
                        type: 'error',
                        code: 'INVALID_JUNCTION_OBJECT_ORDER',
                        message: `Junction object '${obj.fullName}' Master-Detail fields must have relationshipOrder values of 0 and 1, but has ${sortedOrders.join(', ')}.`,
                        objectName: obj.fullName,
                    });
                }
            }
        }
        else if (masterDetailFields.length > 2) {
            this.errors.push({
                type: 'error',
                code: 'TOO_MANY_MASTER_DETAIL_FIELDS',
                message: `Object '${obj.fullName}' has ${masterDetailFields.length} Master-Detail fields. An object can have at most 2 Master-Detail relationships.`,
                objectName: obj.fullName,
            });
        }
    }
    /**
     * Validate Roll-Up Summary field rules
     */
    validateSummaryFieldRules(obj) {
        if (!obj.fields)
            return;
        obj.fields.forEach((field) => {
            if (field.type === 'Summary') {
                const summaryField = field;
                // summaryOperation COUNT doesn't need summarizedField
                if (summaryField.summaryOperation !== 'COUNT' && !summaryField.summarizedField) {
                    this.errors.push({
                        type: 'error',
                        code: 'MISSING_SUMMARIZED_FIELD',
                        message: `Summary field '${field.fullName}' with operation '${summaryField.summaryOperation}' must specify summarizedField.`,
                        objectName: obj.fullName,
                        fieldName: field.fullName,
                    });
                }
                // summaryForeignKey must reference a Master-Detail field on the CHILD object
                // We can validate that it's specified, but cross-object validation would need the child object schema
                if (!summaryField.summaryForeignKey) {
                    this.errors.push({
                        type: 'error',
                        code: 'MISSING_SUMMARY_FOREIGN_KEY',
                        message: `Summary field '${field.fullName}' must specify summaryForeignKey (the Master-Detail field on the child object).`,
                        objectName: obj.fullName,
                        fieldName: field.fullName,
                    });
                }
            }
        });
    }
    /**
     * Validate scale <= precision for Number, Currency, Percent fields
     */
    validateScalePrecisionRules(obj) {
        if (!obj.fields)
            return;
        obj.fields.forEach((field) => {
            if (field.type === 'Number' || field.type === 'Currency' || field.type === 'Percent') {
                const numericField = field;
                if (numericField.scale > numericField.precision) {
                    this.errors.push({
                        type: 'error',
                        code: 'INVALID_SCALE_PRECISION',
                        message: `Field '${field.fullName}' has scale (${numericField.scale}) greater than precision (${numericField.precision}). Scale must be less than or equal to precision.`,
                        objectName: obj.fullName,
                        fieldName: field.fullName,
                    });
                }
            }
        });
    }
    /**
     * Helper: Check if field is a relationship field
     */
    isRelationshipField(field) {
        return (field.type === 'Lookup' ||
            field.type === 'MasterDetail' ||
            field.type === 'ExternalLookup' ||
            field.type === 'IndirectLookup' ||
            field.type === 'Hierarchy' ||
            field.type === 'MetadataRelationship');
    }
}
exports.SchemaValidator = SchemaValidator;
//# sourceMappingURL=SchemaValidator.js.map
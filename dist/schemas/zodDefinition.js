"use strict";
// src/schemas/zodDefinitions.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.percentFieldSchema = exports.currencyFieldSchema = exports.numberFieldSchema = exports.formulaFieldSchema = exports.summaryFieldSchema = exports.picklistFieldSchema = exports.masterDetailFieldSchema = exports.lookupFieldSchema = exports.textFieldSchema = exports.schemaArraySchema = exports.customObjectSchema = exports.fieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Salesforce API Name Pattern: Must end with __c, alphanumeric + underscores, max 40 chars
 */
const apiNamePattern = /^[a-zA-Z][a-zA-Z0-9_]*__c$/;
/**
 * Relationship Name Pattern: Alphanumeric + underscores, starts with letter
 */
const relationshipNamePattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
/**
 * Base Field Schema
 */
const baseFieldSchema = zod_1.z.object({
    fullName: zod_1.z.string()
        .min(1, 'Field name is required')
        .max(40, 'Field name must be 40 characters or less')
        .regex(apiNamePattern, 'Field name must end with __c and contain only alphanumeric characters and underscores'),
    label: zod_1.z.string().min(1, 'Field label is required'),
    description: zod_1.z.string().optional(),
    inlineHelpText: zod_1.z.string().optional(),
    required: zod_1.z.boolean().optional(),
    unique: zod_1.z.boolean().optional(),
    externalId: zod_1.z.boolean().optional(),
    trackHistory: zod_1.z.boolean().optional(),
    trackFeedHistory: zod_1.z.boolean().optional(),
    trackTrending: zod_1.z.boolean().optional(),
});
/**
 * Text Field
 */
const textFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Text'),
    length: zod_1.z.number().int().min(1).max(255, 'Text field length must be 255 or less'),
    defaultValue: zod_1.z.string().optional(),
    caseSensitive: zod_1.z.boolean().optional(),
});
exports.textFieldSchema = textFieldSchema;
/**
 * LongTextArea Field
 */
const longTextAreaFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('LongTextArea'),
    length: zod_1.z.number().int().min(1).max(131072, 'LongTextArea length must be 131,072 or less'),
    visibleLines: zod_1.z.number().int().min(1).max(50).optional(),
    defaultValue: zod_1.z.string().optional(),
});
/**
 * RichTextArea Field
 */
const richTextAreaFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('RichTextArea'),
    length: zod_1.z.number().int().min(1).max(131072, 'RichTextArea length must be 131,072 or less'),
    visibleLines: zod_1.z.number().int().min(1).max(50).optional(),
});
/**
 * Checkbox Field
 */
const checkboxFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Checkbox'),
    defaultValue: zod_1.z.boolean().optional(),
});
/**
 * Number Field
 */
const numberFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Number'),
    precision: zod_1.z.number().int().min(1).max(18, 'Number precision must be 18 or less'),
    scale: zod_1.z.number().int().min(0),
    defaultValue: zod_1.z.number().optional(),
});
exports.numberFieldSchema = numberFieldSchema;
/**
 * Currency Field
 */
const currencyFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Currency'),
    precision: zod_1.z.number().int().min(1).max(18, 'Currency precision must be 18 or less'),
    scale: zod_1.z.number().int().min(0),
    defaultValue: zod_1.z.number().optional(),
});
exports.currencyFieldSchema = currencyFieldSchema;
/**
 * Percent Field
 */
const percentFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Percent'),
    precision: zod_1.z.number().int().min(1).max(18, 'Percent precision must be 18 or less'),
    scale: zod_1.z.number().int().min(0),
    defaultValue: zod_1.z.number().optional(),
});
exports.percentFieldSchema = percentFieldSchema;
/**
 * Date Field
 */
const dateFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Date'),
    defaultValue: zod_1.z.string().optional(),
});
/**
 * DateTime Field
 */
const dateTimeFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('DateTime'),
    defaultValue: zod_1.z.string().optional(),
});
/**
 * Time Field
 */
const timeFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Time'),
    defaultValue: zod_1.z.string().optional(),
});
/**
 * Email Field
 */
const emailFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Email'),
    defaultValue: zod_1.z.string().email().optional(),
});
/**
 * Phone Field
 */
const phoneFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Phone'),
    defaultValue: zod_1.z.string().optional(),
});
/**
 * Url Field
 */
const urlFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Url'),
    defaultValue: zod_1.z.string().url().optional(),
});
/**
 * Picklist Value
 */
const picklistValueSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'Picklist value name is required'),
    label: zod_1.z.string().min(1, 'Picklist value label is required'),
    default: zod_1.z.boolean().optional(),
    color: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
/**
 * Picklist Field
 */
const picklistFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Picklist'),
    valueSet: zod_1.z.object({
        definition: zod_1.z.array(picklistValueSchema).min(1, 'Picklist must have at least one value'),
    }),
    sorted: zod_1.z.boolean().optional(),
    restricted: zod_1.z.boolean().optional(),
});
exports.picklistFieldSchema = picklistFieldSchema;
/**
 * MultiselectPicklist Field
 */
const multiselectPicklistFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('MultiselectPicklist'),
    valueSet: zod_1.z.object({
        definition: zod_1.z.array(picklistValueSchema).min(1, 'MultiselectPicklist must have at least one value'),
    }),
    visibleLines: zod_1.z.number().int().min(1).max(10).optional(),
    sorted: zod_1.z.boolean().optional(),
    restricted: zod_1.z.boolean().optional(),
});
/**
 * Filter Item
 */
const filterItemSchema = zod_1.z.object({
    field: zod_1.z.string(),
    operation: zod_1.z.enum(['equals', 'notEqual', 'lessThan', 'greaterThan', 'lessOrEqual', 'greaterOrEqual', 'contains', 'notContain', 'startsWith', 'includes', 'excludes']),
    value: zod_1.z.string().optional(),
    valueField: zod_1.z.string().optional(),
});
/**
 * Lookup Filter
 */
const lookupFilterSchema = zod_1.z.object({
    active: zod_1.z.boolean(),
    booleanFilter: zod_1.z.string().optional(),
    errorMessage: zod_1.z.string().optional(),
    infoMessage: zod_1.z.string().optional(),
    filterItems: zod_1.z.array(filterItemSchema).optional(),
});
/**
 * Lookup Field
 */
const lookupFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Lookup'),
    referenceTo: zod_1.z.string().min(1, 'Lookup referenceTo is required'),
    relationshipLabel: zod_1.z.string().optional(),
    relationshipName: zod_1.z.string()
        .min(1, 'Relationship name is required')
        .regex(relationshipNamePattern, 'Relationship name must start with a letter and contain only alphanumeric characters and underscores'),
    deleteConstraint: zod_1.z.enum(['SetNull', 'Restrict', 'Cascade']).optional(),
    lookupFilter: lookupFilterSchema.optional(),
});
exports.lookupFieldSchema = lookupFieldSchema;
/**
 * MasterDetail Field
 */
const masterDetailFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('MasterDetail'),
    referenceTo: zod_1.z.string().min(1, 'MasterDetail referenceTo is required'),
    relationshipLabel: zod_1.z.string().optional(),
    relationshipName: zod_1.z.string()
        .min(1, 'Relationship name is required')
        .regex(relationshipNamePattern, 'Relationship name must start with a letter and contain only alphanumeric characters and underscores'),
    relationshipOrder: zod_1.z.number().int().min(0).max(1).optional(),
    reparentableMasterDetail: zod_1.z.boolean().optional(),
    writeRequiresMasterRead: zod_1.z.boolean().optional(),
});
exports.masterDetailFieldSchema = masterDetailFieldSchema;
/**
 * ExternalLookup Field
 */
const externalLookupFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('ExternalLookup'),
    referenceTo: zod_1.z.string().min(1, 'ExternalLookup referenceTo is required'),
    relationshipName: zod_1.z.string()
        .min(1, 'Relationship name is required')
        .regex(relationshipNamePattern, 'Relationship name must start with a letter and contain only alphanumeric characters and underscores'),
    externalIdStandardField: zod_1.z.string().optional(),
});
/**
 * IndirectLookup Field
 */
const indirectLookupFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('IndirectLookup'),
    referenceTo: zod_1.z.string().min(1, 'IndirectLookup referenceTo is required'),
    relationshipName: zod_1.z.string()
        .min(1, 'Relationship name is required')
        .regex(relationshipNamePattern, 'Relationship name must start with a letter and contain only alphanumeric characters and underscores'),
    referenceTargetField: zod_1.z.string().min(1, 'IndirectLookup referenceTargetField is required'),
});
/**
 * Hierarchy Field
 */
const hierarchyFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Hierarchy'),
    referenceTo: zod_1.z.string().min(1, 'Hierarchy referenceTo is required'),
    relationshipLabel: zod_1.z.string().optional(),
    relationshipName: zod_1.z.string()
        .min(1, 'Relationship name is required')
        .regex(relationshipNamePattern, 'Relationship name must start with a letter and contain only alphanumeric characters and underscores'),
});
/**
 * MetadataRelationship Field
 */
const metadataRelationshipFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('MetadataRelationship'),
    referenceTo: zod_1.z.string().min(1, 'MetadataRelationship referenceTo is required'),
    relationshipLabel: zod_1.z.string().optional(),
    relationshipName: zod_1.z.string()
        .min(1, 'Relationship name is required')
        .regex(relationshipNamePattern, 'Relationship name must start with a letter and contain only alphanumeric characters and underscores'),
});
/**
 * Formula Field
 */
const formulaFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Formula'),
    formula: zod_1.z.string().min(1, 'Formula is required'),
    formulaTreatBlanksAs: zod_1.z.enum(['BlankAsZero', 'BlankAsBlank']).optional(),
    returnType: zod_1.z.enum(['Text', 'Number', 'Currency', 'Date', 'DateTime', 'Checkbox', 'Percent']),
    precision: zod_1.z.number().int().min(1).max(18).optional(),
    scale: zod_1.z.number().int().min(0).optional(),
});
exports.formulaFieldSchema = formulaFieldSchema;
/**
 * Summary Field
 */
const summaryFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Summary'),
    summarizedField: zod_1.z.string().optional(),
    summaryForeignKey: zod_1.z.string().min(1, 'Summary field must specify summaryForeignKey (Master-Detail field)'),
    summaryOperation: zod_1.z.enum(['COUNT', 'SUM', 'MIN', 'MAX', 'AVG']),
    summaryFilterItems: zod_1.z.array(filterItemSchema).optional(),
});
exports.summaryFieldSchema = summaryFieldSchema;
/**
 * AutoNumber Field
 */
const autoNumberFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('AutoNumber'),
    displayFormat: zod_1.z.string().min(1, 'AutoNumber displayFormat is required'),
    startingNumber: zod_1.z.number().int().min(0).optional(),
});
/**
 * Location Field
 */
const locationFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('Location'),
    displayLocationInDecimal: zod_1.z.boolean().optional(),
    scale: zod_1.z.number().int().min(0).max(15).optional(),
});
/**
 * EncryptedText Field
 */
const encryptedTextFieldSchema = baseFieldSchema.extend({
    type: zod_1.z.literal('EncryptedText'),
    length: zod_1.z.number().int().min(1).max(175, 'EncryptedText length must be 175 or less'),
    maskChar: zod_1.z.enum(['asterisk', 'X']).optional(),
    maskType: zod_1.z.enum(['all', 'creditCard', 'ssn', 'lastFour', 'sin', 'nino']).optional(),
});
/**
 * Discriminated Union for all Field Types
 */
exports.fieldSchema = zod_1.z.discriminatedUnion('type', [
    textFieldSchema,
    longTextAreaFieldSchema,
    richTextAreaFieldSchema,
    checkboxFieldSchema,
    numberFieldSchema,
    currencyFieldSchema,
    percentFieldSchema,
    dateFieldSchema,
    dateTimeFieldSchema,
    timeFieldSchema,
    emailFieldSchema,
    phoneFieldSchema,
    urlFieldSchema,
    picklistFieldSchema,
    multiselectPicklistFieldSchema,
    lookupFieldSchema,
    masterDetailFieldSchema,
    externalLookupFieldSchema,
    indirectLookupFieldSchema,
    hierarchyFieldSchema,
    metadataRelationshipFieldSchema,
    formulaFieldSchema,
    summaryFieldSchema,
    autoNumberFieldSchema,
    locationFieldSchema,
    encryptedTextFieldSchema,
]);
/**
 * Name Field Schema
 */
const nameFieldSchema = zod_1.z.object({
    type: zod_1.z.enum(['Text', 'AutoNumber']),
    label: zod_1.z.string().min(1, 'Name field label is required'),
    displayFormat: zod_1.z.string().optional(),
    startingNumber: zod_1.z.number().int().min(0).optional(),
});
/**
 * Object Features Schema
 */
const objectFeaturesSchema = zod_1.z.object({
    enableActivities: zod_1.z.boolean().optional(),
    enableReports: zod_1.z.boolean().optional(),
    enableSearch: zod_1.z.boolean().optional(),
    enableHistory: zod_1.z.boolean().optional(),
    enableFeeds: zod_1.z.boolean().optional(),
    enableBulkApi: zod_1.z.boolean().optional(),
    enableSharing: zod_1.z.boolean().optional(),
    enableStreamingApi: zod_1.z.boolean().optional(),
});
/**
 * Custom Object Schema
 */
exports.customObjectSchema = zod_1.z.object({
    fullName: zod_1.z.string()
        .min(1, 'Object name is required')
        .max(40, 'Object name must be 40 characters or less')
        .regex(apiNamePattern, 'Object name must end with __c and contain only alphanumeric characters and underscores'),
    label: zod_1.z.string().min(1, 'Object label is required'),
    pluralLabel: zod_1.z.string().min(1, 'Object plural label is required'),
    description: zod_1.z.string().optional(),
    deploymentStatus: zod_1.z.enum(['Deployed', 'InDevelopment']),
    sharingModel: zod_1.z.enum([
        'Private',
        'Read',
        'ReadWrite',
        'ReadWriteTransfer',
        'FullAccess',
        'ControlledByParent',
        'ControlledByCampaign',
        'ControlledByLeadOrContact'
    ]),
    features: objectFeaturesSchema.optional(),
    nameField: nameFieldSchema,
    fields: zod_1.z.array(exports.fieldSchema).optional(),
    visibility: zod_1.z.enum(['Public', 'Protected', 'PackageProtected']).optional(),
});
/**
 * Schema Array (Root)
 */
exports.schemaArraySchema = zod_1.z.array(exports.customObjectSchema).min(1, 'At least one object is required');
//# sourceMappingURL=zodDefinition.js.map
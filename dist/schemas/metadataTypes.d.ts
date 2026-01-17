/**
 * Base validation error interface
 */
export interface ValidationError {
    type: 'error' | 'warning';
    code: string;
    message: string;
    objectName?: string;
    fieldName?: string;
    path?: string;
}
/**
 * Validated schema result
 */
export interface ValidatedSchema {
    objects: CustomObjectSchema[];
    errors: ValidationError[];
    warnings: ValidationError[];
    isValid: boolean;
}
/**
 * Custom Object Schema - Top Level
 */
export interface CustomObjectSchema {
    fullName: string;
    label: string;
    pluralLabel: string;
    description?: string;
    deploymentStatus: 'Deployed' | 'InDevelopment';
    sharingModel: 'Private' | 'Read' | 'ReadWrite' | 'ReadWriteTransfer' | 'FullAccess' | 'ControlledByParent' | 'ControlledByCampaign' | 'ControlledByLeadOrContact';
    features?: ObjectFeatures;
    nameField: NameField;
    fields?: Field[];
    visibility?: 'Public' | 'Protected' | 'PackageProtected';
}
/**
 * Object Features/Capabilities
 */
export interface ObjectFeatures {
    enableActivities?: boolean;
    enableReports?: boolean;
    enableSearch?: boolean;
    enableHistory?: boolean;
    enableFeeds?: boolean;
    enableBulkApi?: boolean;
    enableSharing?: boolean;
    enableStreamingApi?: boolean;
}
/**
 * Name Field (required for all custom objects)
 */
export interface NameField {
    type: 'Text' | 'AutoNumber';
    label: string;
    displayFormat?: string;
    startingNumber?: number;
}
/**
 * Base Field Interface
 */
export interface BaseField {
    fullName: string;
    label: string;
    description?: string;
    inlineHelpText?: string;
    required?: boolean;
    unique?: boolean;
    externalId?: boolean;
    trackHistory?: boolean;
    trackFeedHistory?: boolean;
    trackTrending?: boolean;
}
/**
 * Text Field
 */
export interface TextField extends BaseField {
    type: 'Text';
    length: number;
    defaultValue?: string;
    caseSensitive?: boolean;
}
/**
 * LongTextArea Field
 */
export interface LongTextAreaField extends BaseField {
    type: 'LongTextArea';
    length: number;
    visibleLines?: number;
    defaultValue?: string;
}
/**
 * RichTextArea Field
 */
export interface RichTextAreaField extends BaseField {
    type: 'RichTextArea';
    length: number;
    visibleLines?: number;
}
/**
 * Checkbox Field
 */
export interface CheckboxField extends BaseField {
    type: 'Checkbox';
    defaultValue?: boolean;
}
/**
 * Number Field
 */
export interface NumberField extends BaseField {
    type: 'Number';
    precision: number;
    scale: number;
    defaultValue?: number;
}
/**
 * Currency Field
 */
export interface CurrencyField extends BaseField {
    type: 'Currency';
    precision: number;
    scale: number;
    defaultValue?: number;
}
/**
 * Percent Field
 */
export interface PercentField extends BaseField {
    type: 'Percent';
    precision: number;
    scale: number;
    defaultValue?: number;
}
/**
 * Date Field
 */
export interface DateField extends BaseField {
    type: 'Date';
    defaultValue?: string;
}
/**
 * DateTime Field
 */
export interface DateTimeField extends BaseField {
    type: 'DateTime';
    defaultValue?: string;
}
/**
 * Time Field
 */
export interface TimeField extends BaseField {
    type: 'Time';
    defaultValue?: string;
}
/**
 * Email Field
 */
export interface EmailField extends BaseField {
    type: 'Email';
    defaultValue?: string;
}
/**
 * Phone Field
 */
export interface PhoneField extends BaseField {
    type: 'Phone';
    defaultValue?: string;
}
/**
 * Url Field
 */
export interface UrlField extends BaseField {
    type: 'Url';
    defaultValue?: string;
}
/**
 * Picklist Value
 */
export interface PicklistValue {
    fullName: string;
    label: string;
    default?: boolean;
    color?: string;
    description?: string;
}
/**
 * Picklist Field
 */
export interface PicklistField extends BaseField {
    type: 'Picklist';
    valueSet: {
        definition: PicklistValue[];
    };
    sorted?: boolean;
    restricted?: boolean;
}
/**
 * MultiselectPicklist Field
 */
export interface MultiselectPicklistField extends BaseField {
    type: 'MultiselectPicklist';
    valueSet: {
        definition: PicklistValue[];
    };
    visibleLines?: number;
    sorted?: boolean;
    restricted?: boolean;
}
/**
 * Lookup Field
 */
export interface LookupField extends BaseField {
    type: 'Lookup';
    referenceTo: string;
    relationshipLabel?: string;
    relationshipName: string;
    deleteConstraint?: 'SetNull' | 'Restrict' | 'Cascade';
    lookupFilter?: LookupFilter;
}
/**
 * MasterDetail Field
 */
export interface MasterDetailField extends BaseField {
    type: 'MasterDetail';
    referenceTo: string;
    relationshipLabel?: string;
    relationshipName: string;
    relationshipOrder?: number;
    reparentableMasterDetail?: boolean;
    writeRequiresMasterRead?: boolean;
}
/**
 * ExternalLookup Field
 */
export interface ExternalLookupField extends BaseField {
    type: 'ExternalLookup';
    referenceTo: string;
    relationshipName: string;
    externalIdStandardField?: string;
}
/**
 * IndirectLookup Field
 */
export interface IndirectLookupField extends BaseField {
    type: 'IndirectLookup';
    referenceTo: string;
    relationshipName: string;
    referenceTargetField: string;
}
/**
 * Hierarchy Field (Lookup to same object)
 */
export interface HierarchyField extends BaseField {
    type: 'Hierarchy';
    referenceTo: string;
    relationshipLabel?: string;
    relationshipName: string;
}
/**
 * MetadataRelationship Field
 */
export interface MetadataRelationshipField extends BaseField {
    type: 'MetadataRelationship';
    referenceTo: string;
    relationshipLabel?: string;
    relationshipName: string;
}
/**
 * Lookup Filter
 */
export interface LookupFilter {
    active: boolean;
    booleanFilter?: string;
    errorMessage?: string;
    infoMessage?: string;
    filterItems?: FilterItem[];
}
/**
 * Filter Item
 */
export interface FilterItem {
    field: string;
    operation: 'equals' | 'notEqual' | 'lessThan' | 'greaterThan' | 'lessOrEqual' | 'greaterOrEqual' | 'contains' | 'notContain' | 'startsWith' | 'includes' | 'excludes';
    value?: string;
    valueField?: string;
}
/**
 * Formula Field
 */
export interface FormulaField extends BaseField {
    type: 'Formula';
    formula: string;
    formulaTreatBlanksAs?: 'BlankAsZero' | 'BlankAsBlank';
    returnType: 'Text' | 'Number' | 'Currency' | 'Date' | 'DateTime' | 'Checkbox' | 'Percent';
    precision?: number;
    scale?: number;
}
/**
 * Summary (Roll-Up) Field
 */
export interface SummaryField extends BaseField {
    type: 'Summary';
    summarizedField?: string;
    summaryForeignKey: string;
    summaryOperation: 'COUNT' | 'SUM' | 'MIN' | 'MAX' | 'AVG';
    summaryFilterItems?: FilterItem[];
}
/**
 * AutoNumber Field
 */
export interface AutoNumberField extends BaseField {
    type: 'AutoNumber';
    displayFormat: string;
    startingNumber?: number;
}
/**
 * Location Field (Geolocation)
 */
export interface LocationField extends BaseField {
    type: 'Location';
    displayLocationInDecimal?: boolean;
    scale?: number;
}
/**
 * EncryptedText Field
 */
export interface EncryptedTextField extends BaseField {
    type: 'EncryptedText';
    length: number;
    maskChar?: 'asterisk' | 'X';
    maskType?: 'all' | 'creditCard' | 'ssn' | 'lastFour' | 'sin' | 'nino';
}
/**
 * Union type for all field types
 */
export type Field = TextField | LongTextAreaField | RichTextAreaField | CheckboxField | NumberField | CurrencyField | PercentField | DateField | DateTimeField | TimeField | EmailField | PhoneField | UrlField | PicklistField | MultiselectPicklistField | LookupField | MasterDetailField | ExternalLookupField | IndirectLookupField | HierarchyField | MetadataRelationshipField | FormulaField | SummaryField | AutoNumberField | LocationField | EncryptedTextField;

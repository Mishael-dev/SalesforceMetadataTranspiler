export interface BaseJsonField {
    fullName: string;
    label: string;
    description?: string;
    inlineHelpText?: string;
    helpText?: string;
    required?: boolean;
    unique?: boolean;
    externalId?: boolean;
    trackHistory?: boolean;
    trackTrending?: boolean;
}
export interface FormulaField extends BaseJsonField {
    type: "Formula";
    formula: string;
    blankOption?: string;
    returnType: string;
}
export interface LookupField extends BaseJsonField {
    type: "Lookup";
    referenceTo: string;
    relationshipLabel: string;
    relationshipName: string;
    deleteConstraint?: string;
}
export interface MasterDetailField extends BaseJsonField {
    type: "MasterDetail";
    referenceTo: string;
    relationshipLabel: string;
    relationshipName: string;
    relationshipOrder?: number;
    reparentableMasterDetail?: boolean;
    writeRequiresMasterRead?: boolean;
}
export interface PicklistValue {
    fullName: string;
    label: string;
    default: boolean;
}
export interface ValueSet {
    restricted: boolean;
    sorted?: boolean;
    values: PicklistValue[];
}
export interface PicklistField extends BaseJsonField {
    type: "Picklist";
    valueSet: ValueSet;
}
export interface MultiselectPicklistField extends BaseJsonField {
    type: "MultiselectPicklist";
    valueSet: ValueSet;
    visibleLines?: number;
}
export interface TextField extends BaseJsonField {
    type: "Text";
    length?: number;
}
export interface NumberField extends BaseJsonField {
    type: "Number";
    precision?: number;
    scale?: number;
}
export interface SummaryField extends BaseJsonField {
    type: "Summary";
    summarizedField: string;
    summaryForeignKey: string;
    summaryOperation: "count" | "sum" | "min" | "max" | "avg";
}
export type JsonField = FormulaField | TextField | NumberField | SummaryField | LookupField | MasterDetailField | PicklistField | MultiselectPicklistField;
export interface NameField {
    label: string;
    type: string;
    trackHistory: boolean;
}
export interface CustomObject {
    type: "CustomObject";
    label: string;
    fullName: string;
    pluralLabel: string;
    description?: string;
    deploymentStatus: string;
    allowInChatterGroups?: boolean;
    nameField: NameField;
    enableActivities?: boolean;
    enableBulkApi?: boolean;
    enableFeeds?: boolean;
    enableHistory?: boolean;
    enableLicensing?: boolean;
    enableReports?: boolean;
    enableSearch?: boolean;
    enableSharing?: boolean;
    enableStreamingApi?: boolean;
    visibility?: string;
    sharingModel?: string;
    externalSharingModel?: string;
    fields?: JsonField[];
}
export type validationContext = CustomObject[];
export interface GeneratedXml {
    metadataType: string;
    fullName: string;
    parentFullName?: string;
    xml: string;
}
export interface GenerationContext {
    parentFullName?: string;
}
//# sourceMappingURL=types.d.ts.map
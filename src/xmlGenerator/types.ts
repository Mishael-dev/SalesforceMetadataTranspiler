
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

export type JsonField = FormulaField | TextField | NumberField;

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
  fields?: JsonField[];
}

// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface GeneratedXml {
  metadataType: string;
  fullName: string;
  parentFullName?: string;
  xml: string;
}

export interface GenerationContext {
  parentFullName?: string;
}


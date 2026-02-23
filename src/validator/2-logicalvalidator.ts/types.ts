import { ValidationError } from "../../types/validationResult";

export type ValidationRule = (
  data: MetadataItem[],
  context: ValidationContext,
) => ValidationError[];

export interface ValidationContext {
  standardObjects: Set<string>;
  customObjects: Set<string>;
}

export interface MetadataItem {
  type: string;
  fullName: string;
  fields?: FieldDefinition[];
}

export interface FieldDefinition {
  type: string;
  fullName: string;
  referenceTo?: string;
  summarizedObject?: string;
  summarizedField?: string;
  formula?: string;
}


export interface MetadataValidator {
  supports(item: MetadataItem): boolean;
  validate(item: MetadataItem, allItems: MetadataItem[]): ValidationError[];
}

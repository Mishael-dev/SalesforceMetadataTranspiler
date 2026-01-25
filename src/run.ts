import { writeFileSync } from "fs";

interface JsonField {
  type: string;
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

interface FormulaJsonField extends JsonField {
  //fields specific to the formula field let's use any for now
  blankOption: string;
  formula: string;
}

interface GeneratedXml {
  metadataType: "CustomObject" | "CustomField";
  fullName: string;
  parent?: string;
  xml: string;
}

interface FieldXmlGenerator {
  supports(field: JsonField): boolean;
  generate(field: JsonField): GeneratedXml;
}

abstract class BaseFieldGenerator implements FieldXmlGenerator {
  abstract supports(field: JsonField): boolean;
  protected abstract buildTypeSpecificTags(field: JsonField): string;
  protected buildSharedTags(field: JsonField) {
    return [
      this.xmlTag("fullName", field.fullName),
      this.xmlTag("label", field.label),
      this.xmlTag("type", field.type),
      this.xmlTag("description", field.description),
      this.xmlTag("inlineHelpText", field.helpText),
      this.xmlTag("trackHistory", field.trackHistory),
      this.xmlTag("trackTrending", field.trackTrending),
      this.xmlTag("externalId", field.externalId),
      this.xmlTag("required", field.required),
    ].join("\n");
  }

  public generate(field: JsonField): GeneratedXml {
    const body = `${this.buildSharedTags(field)} ${this.buildTypeSpecificTags(field)}`;
    const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
${body}
</CustomField>`;
    return {
      metadataType: "CustomField",
      fullName: field.fullName,
      parent: "",
      xml: xmlBody,
    };
  }

  protected xmlTag(tag: string, value: any): string {
    if (value === undefined || value === null) return "";
    return `<${tag}>${this.escapeXml(String(value))}</${tag}>`;
  }

  protected escapeXml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

class FormulaXmlGenerator extends BaseFieldGenerator {
  supports(field: JsonField): boolean {
    return field.type.toLowerCase() === "formula";
  }

  protected buildTypeSpecificTags(field: FormulaJsonField): string {
    return [
      this.xmlTag("formula", field.formula),
      this.xmlTag("formulaTreatBlanksAs", field.blankOption),
      this.xmlTag("unique", field.unique),
    ].join("\n");
  }
}

const gen = new FormulaXmlGenerator();

const field = {
  type: "Formula",
  label: "Asset Status Label",
  fullName: "Asset_Status_Label__c",
  returnType: "Text",
  formula: 'IF(NOT(ISBLANK(Asset_ID__c)), "ACTIVE: " & Name, "INACTIVE")',
  blankOption: "BlankAsZero",
  description:
    "Displays a human-readable status based on whether the asset has been assigned an ID.",
  helpText: "Shows ACTIVE or INACTIVE followed by the record name.",
  externalId: false,
  required: false,
  unique: false,
  trackHistory: false,
  trackTrending: false
};

const result = gen.generate(field);

writeFileSync("field3.xml", result.xml, "utf8");
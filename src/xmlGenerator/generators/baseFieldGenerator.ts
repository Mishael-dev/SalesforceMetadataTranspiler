import { XmlUtils } from "../utils/xmlUtils";
import { GenerationContext } from "../types";

export abstract class BaseFieldGenerator {
  protected buildSharedTags(field: any): string[] {
    return [
      XmlUtils.xmlTag("fullName", field.fullName),
      XmlUtils.xmlTag("label", field.label),
      XmlUtils.xmlTag("type", field.type),
      XmlUtils.xmlTag("description", field.description),
      XmlUtils.xmlTag("inlineHelpText", field.helpText),
      XmlUtils.xmlTag("trackHistory", field.trackHistory),
      XmlUtils.xmlTag("trackTrending", field.trackTrending),
      XmlUtils.xmlTag("externalId", field.externalId),
      XmlUtils.xmlTag("required", field.required),
      XmlUtils.xmlTag("unique", field.unique),
    ];
  }

  protected buildFullName(fieldName: string, context: GenerationContext): string {
    return context.parentFullName
      ? `${context.parentFullName}.${fieldName}`
      : fieldName;
  }

  protected buildXmlFromTags(tags: string[]): string {
    const body = tags.filter((tag) => tag !== "").join("\n    ");
    return XmlUtils.buildXmlDocument(
      "CustomField",
      "http://soap.sforce.com/2006/04/metadata",
      `    ${body}`,
    );
  }
}
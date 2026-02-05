// GenericFieldGenerator.ts
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { GenerationContext } from "../../../types";
import { XmlUtils } from "../../../utils/xmlUtils";
import { GeneratedXml } from "../../../types";
import { BaseJsonField } from "../../../types";

const SIMPLE_FIELD_TYPES = [
  "AutoNumber",
  "Checkbox",
  "Currency",
  "Date",
  "DateTime",
  "Email",
  "Location", // Geolocation
  "Number",
  "Percent",
  "Phone",
  "Text",
  "TextArea",
  "EncryptedText",
  "LongTextArea",
  "Html", // Rich Text
  "Time",
  "Url"
] as const;

export class GenericFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<BaseJsonField> {
  readonly priority = 30; // Lower priority than specialized generators

  supports(data: any): data is BaseJsonField {
    return SIMPLE_FIELD_TYPES.includes(data.type);
  }

  generate(field: BaseJsonField, context: GenerationContext): GeneratedXml {
    const fullName = this.buildFullName(field.fullName, context);
    const parentFullName = context.parentFullName;

    const tags = [
      ...this.buildSharedTags(field),
      ...this.buildTypeSpecificTags(field),
    ];

    const xml = this.buildXmlFromTags(tags);

    return {
      metadataType: "CustomField",
      fullName,
      parentFullName,
      xml,
    };
  }

  private buildTypeSpecificTags(field: any): string[] {
    const tags: string[] = [];

    // Map all additional properties to XML tags
    const excludedKeys = new Set([
      'type', 'label', 'fullName', 'description', 'inlineHelpText',
      'trackHistory', 'trackTrending', 'externalId', 'required', 'unique'
    ]);

    for (const [key, value] of Object.entries(field)) {
      if (!excludedKeys.has(key) && value !== undefined && value !== null) {
        tags.push(XmlUtils.xmlTag(key, value));
      }
    }

    return tags;
  }
}
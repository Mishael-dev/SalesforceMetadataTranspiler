// LookupFieldGenerator.ts
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { LookupField } from "../../../types";
import { GenerationContext } from "../../../types";
import { XmlUtils } from "../../../utils/xmlUtils";
import { GeneratedXml } from "../../../types";

export class LookupFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<LookupField> {
  readonly priority = 20;

  supports(data: any): data is LookupField {
    return data.type === "Lookup";
  }

  generate(field: LookupField, context: GenerationContext): GeneratedXml {
    const fullName = this.buildFullName(field.fullName, context);
    const parentFullName = context.parentFullName;

    const tags = [
      ...this.buildSharedTags(field),
      XmlUtils.xmlTag("referenceTo", field.referenceTo),
      XmlUtils.xmlTag("relationshipLabel", field.relationshipLabel),
      XmlUtils.xmlTag("relationshipName", field.relationshipName),
      XmlUtils.xmlTag("deleteConstraint", field.deleteConstraint),
    ];

    const xml = this.buildXmlFromTags(tags);

    return {
      metadataType: "CustomField",
      fullName,
      parentFullName,
      xml,
    };
  }
}

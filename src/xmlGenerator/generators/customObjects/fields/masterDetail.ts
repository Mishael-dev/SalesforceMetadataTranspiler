
// MasterDetailFieldGenerator.ts
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { MasterDetailField } from "../../../types";
import { GenerationContext } from "../../../types";
import { XmlUtils } from "../../../utils/xmlUtils";
import { GeneratedXml } from "../../../types";

export class MasterDetailFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<MasterDetailField> {
  readonly priority = 20;

  supports(data: any): data is MasterDetailField {
    return data.type === "MasterDetail";
  }

  generate(field: MasterDetailField, context: GenerationContext): GeneratedXml {
    const fullName = this.buildFullName(field.fullName, context);
    const parentFullName = context.parentFullName;

    const tags = [
      ...this.buildSharedTags(field),
      XmlUtils.xmlTag("referenceTo", field.referenceTo),
      XmlUtils.xmlTag("relationshipLabel", field.relationshipLabel),
      XmlUtils.xmlTag("relationshipName", field.relationshipName),
      XmlUtils.xmlTag("relationshipOrder", field.relationshipOrder),
      XmlUtils.xmlTag("reparentableMasterDetail", field.reparentableMasterDetail),
      XmlUtils.xmlTag("writeRequiresMasterRead", field.writeRequiresMasterRead),
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

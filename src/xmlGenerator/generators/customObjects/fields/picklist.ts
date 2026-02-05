
// PicklistFieldGenerator.ts
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { PicklistField } from "../../../types";
import { GenerationContext } from "../../../types";
import { XmlUtils } from "../../../utils/xmlUtils";
import { GeneratedXml } from "../../../types";

export class PicklistFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<PicklistField> {
  readonly priority = 20;

  supports(data: any): data is PicklistField {
    return data.type === "Picklist";
  }

  generate(field: PicklistField, context: GenerationContext): GeneratedXml {
    const fullName = this.buildFullName(field.fullName, context);
    const parentFullName = context.parentFullName;

    const valueSetXml = this.buildValueSet(field.valueSet);

    const tags = [
      ...this.buildSharedTags(field),
      valueSetXml,
    ];

    const xml = this.buildXmlFromTags(tags);

    return {
      metadataType: "CustomField",
      fullName,
      parentFullName,
      xml,
    };
  }

  private buildValueSet(valueSet: any): string {
    const values = valueSet.values.map((v: any) => `
        <value>
            <fullName>${XmlUtils.escapeXml(v.fullName)}</fullName>
            <default>${v.default}</default>
            <label>${XmlUtils.escapeXml(v.label)}</label>
        </value>`).join('');

    return `<valueSet>
        <restricted>${valueSet.restricted}</restricted>
        <valueSetDefinition>
            <sorted>${valueSet.sorted || false}</sorted>${values}
        </valueSetDefinition>
    </valueSet>`;
  }
}

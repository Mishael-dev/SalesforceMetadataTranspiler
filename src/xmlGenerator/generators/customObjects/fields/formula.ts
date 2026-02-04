import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { FormulaField } from "../../../types";
import { GenerationContext } from "../../../types";
import { XmlUtils } from "../../../utils/xmlUtils";
import { GeneratedXml } from "../../../types";

export class FormulaFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<FormulaField> {
  readonly priority = 20;

  supports(data: any): data is FormulaField {
    return data.type === "Formula";
  }

  generate(field: FormulaField, context: GenerationContext): GeneratedXml {
    const fullName = this.buildFullName(field.fullName, context);
    const parentFullName = context.parentFullName

    const tags = [
      ...this.buildSharedTags(field),
      XmlUtils.xmlTag("formula", field.formula),
      XmlUtils.xmlTag("formulaTreatBlanksAs", field.blankOption),
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
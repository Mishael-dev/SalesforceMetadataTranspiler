import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { SummaryField } from "../../../types";
import { GenerationContext } from "../../../types";
import { XmlUtils } from "../../../utils/xmlUtils";
import { GeneratedXml } from "../../../types";

export class SummaryFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<SummaryField> {
  readonly priority = 20;

  supports(data: any): data is SummaryField {
    return data.type === "Summary";
  }

  generate(field: SummaryField, context: GenerationContext): GeneratedXml {
    const fullName = this.buildFullName(field.fullName, context);
    const parentFullName = context.parentFullName;

    const tags = [
      XmlUtils.xmlTag("fullName", field.fullName),
      XmlUtils.xmlTag("description", field.description),
      XmlUtils.xmlTag("inlineHelpText", field.inlineHelpText),
      XmlUtils.xmlTag("label", field.label),
      XmlUtils.xmlTag("summarizedField", field.summarizedField),
      XmlUtils.xmlTag("summaryForeignKey", field.summaryForeignKey),
      XmlUtils.xmlTag("summaryOperation", field.summaryOperation),
      XmlUtils.xmlTag("trackHistory", field.trackHistory),
      XmlUtils.xmlTag("trackTrending", field.trackTrending),
      XmlUtils.xmlTag("type", field.type),
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
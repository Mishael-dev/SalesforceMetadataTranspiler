import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { TextField } from "../../../types";
import { GenerationContext } from "../../../types";
import { XmlUtils } from "../../../utils/xmlUtils";
import { GeneratedXml } from "../../../types";

export class TextFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<TextField> {
  readonly priority = 20;

  supports(data: any): data is TextField {
    return data.type === "Text";
  }

  generate(field: TextField, context: GenerationContext): GeneratedXml {
    const fullName = this.buildFullName(field.fullName, context);
    const parentFullName = context.parentFullName

    const tags = [
      ...this.buildSharedTags(field),
      XmlUtils.xmlTag("length", field.length || 255),
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
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { XmlUtils } from "../../../utils/xmlUtils";
export class FormulaFieldGenerator extends BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 20;
    }
    supports(data) {
        return data.type === "Formula";
    }
    generate(field, context) {
        const fullName = this.buildFullName(field.fullName, context);
        const parentFullName = context.parentFullName;
        // 1. Get shared tags (which likely contains <type>Formula</type>)
        const sharedTags = this.buildSharedTags(field);
        // 2. Filter out the incorrect "type" tag
        const filteredSharedTags = sharedTags.filter((tag) => !tag.includes("<type>"));
        const tags = [
            ...filteredSharedTags,
            XmlUtils.xmlTag("formula", field.formula),
            XmlUtils.xmlTag("type", field.returnType),
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

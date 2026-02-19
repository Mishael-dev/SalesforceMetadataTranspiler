import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { XmlUtils } from "../../../utils/xmlUtils";
export class SummaryFieldGenerator extends BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 20;
    }
    supports(data) {
        return data.type === "Summary";
    }
    generate(field, context) {
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryFieldGenerator = void 0;
const baseFieldGenerator_1 = require("../../baseFieldGenerator");
const xmlUtils_1 = require("../../../utils/xmlUtils");
class SummaryFieldGenerator extends baseFieldGenerator_1.BaseFieldGenerator {
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
            xmlUtils_1.XmlUtils.xmlTag("fullName", field.fullName),
            xmlUtils_1.XmlUtils.xmlTag("description", field.description),
            xmlUtils_1.XmlUtils.xmlTag("inlineHelpText", field.inlineHelpText),
            xmlUtils_1.XmlUtils.xmlTag("label", field.label),
            xmlUtils_1.XmlUtils.xmlTag("summarizedField", field.summarizedField),
            xmlUtils_1.XmlUtils.xmlTag("summaryForeignKey", field.summaryForeignKey),
            xmlUtils_1.XmlUtils.xmlTag("summaryOperation", field.summaryOperation),
            xmlUtils_1.XmlUtils.xmlTag("trackHistory", field.trackHistory),
            xmlUtils_1.XmlUtils.xmlTag("trackTrending", field.trackTrending),
            xmlUtils_1.XmlUtils.xmlTag("type", field.type),
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
exports.SummaryFieldGenerator = SummaryFieldGenerator;

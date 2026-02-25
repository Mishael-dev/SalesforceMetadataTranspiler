"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaFieldGenerator = void 0;
const baseFieldGenerator_1 = require("../../baseFieldGenerator");
const xmlUtils_1 = require("../../../utils/xmlUtils");
class FormulaFieldGenerator extends baseFieldGenerator_1.BaseFieldGenerator {
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
            xmlUtils_1.XmlUtils.xmlTag("formula", field.formula),
            xmlUtils_1.XmlUtils.xmlTag("type", field.returnType),
            xmlUtils_1.XmlUtils.xmlTag("formulaTreatBlanksAs", field.blankOption),
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
exports.FormulaFieldGenerator = FormulaFieldGenerator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupFieldGenerator = void 0;
// LookupFieldGenerator.ts
const baseFieldGenerator_1 = require("../../baseFieldGenerator");
const xmlUtils_1 = require("../../../utils/xmlUtils");
class LookupFieldGenerator extends baseFieldGenerator_1.BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 20;
    }
    supports(data) {
        return data.type === "Lookup";
    }
    generate(field, context) {
        const fullName = this.buildFullName(field.fullName, context);
        const parentFullName = context.parentFullName;
        const tags = [
            ...this.buildSharedTags(field),
            xmlUtils_1.XmlUtils.xmlTag("referenceTo", field.referenceTo),
            xmlUtils_1.XmlUtils.xmlTag("relationshipLabel", field.relationshipLabel),
            xmlUtils_1.XmlUtils.xmlTag("relationshipName", field.relationshipName),
            xmlUtils_1.XmlUtils.xmlTag("deleteConstraint", field.deleteConstraint),
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
exports.LookupFieldGenerator = LookupFieldGenerator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterDetailFieldGenerator = void 0;
// MasterDetailFieldGenerator.ts
const baseFieldGenerator_1 = require("../../baseFieldGenerator");
const xmlUtils_1 = require("../../../utils/xmlUtils");
class MasterDetailFieldGenerator extends baseFieldGenerator_1.BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 20;
    }
    supports(data) {
        return data.type === "MasterDetail";
    }
    generate(field, context) {
        const fullName = this.buildFullName(field.fullName, context);
        const parentFullName = context.parentFullName;
        const tags = [
            ...this.buildSharedTags(field),
            xmlUtils_1.XmlUtils.xmlTag("referenceTo", field.referenceTo),
            xmlUtils_1.XmlUtils.xmlTag("relationshipLabel", field.relationshipLabel),
            xmlUtils_1.XmlUtils.xmlTag("relationshipName", field.relationshipName),
            xmlUtils_1.XmlUtils.xmlTag("relationshipOrder", field.relationshipOrder),
            xmlUtils_1.XmlUtils.xmlTag("reparentableMasterDetail", field.reparentableMasterDetail),
            xmlUtils_1.XmlUtils.xmlTag("writeRequiresMasterRead", field.writeRequiresMasterRead),
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
exports.MasterDetailFieldGenerator = MasterDetailFieldGenerator;

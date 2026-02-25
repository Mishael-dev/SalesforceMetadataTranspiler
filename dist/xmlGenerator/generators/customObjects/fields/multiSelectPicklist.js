"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiselectPicklistFieldGenerator = void 0;
// MultiselectPicklistFieldGenerator.ts
const baseFieldGenerator_1 = require("../../baseFieldGenerator");
const xmlUtils_1 = require("../../../utils/xmlUtils");
class MultiselectPicklistFieldGenerator extends baseFieldGenerator_1.BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 20;
    }
    supports(data) {
        return data.type === "MultiselectPicklist";
    }
    generate(field, context) {
        const fullName = this.buildFullName(field.fullName, context);
        const parentFullName = context.parentFullName;
        const valueSetXml = this.buildValueSet(field.valueSet);
        const tags = [
            ...this.buildSharedTags(field),
            valueSetXml,
            xmlUtils_1.XmlUtils.xmlTag("visibleLines", field.visibleLines),
        ];
        const xml = this.buildXmlFromTags(tags);
        return {
            metadataType: "CustomField",
            fullName,
            parentFullName,
            xml,
        };
    }
    buildValueSet(valueSet) {
        const values = valueSet.values.map((v) => `
        <value>
            <fullName>${xmlUtils_1.XmlUtils.escapeXml(v.fullName)}</fullName>
            <default>${v.default}</default>
            <label>${xmlUtils_1.XmlUtils.escapeXml(v.label)}</label>
        </value>`).join('');
        return `<valueSet>
        <restricted>${valueSet.restricted}</restricted>
        <valueSetDefinition>
            <sorted>${valueSet.sorted || false}</sorted>${values}
        </valueSetDefinition>
    </valueSet>`;
    }
}
exports.MultiselectPicklistFieldGenerator = MultiselectPicklistFieldGenerator;

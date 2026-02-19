// PicklistFieldGenerator.ts
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { XmlUtils } from "../../../utils/xmlUtils";
export class PicklistFieldGenerator extends BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 20;
    }
    supports(data) {
        return data.type === "Picklist";
    }
    generate(field, context) {
        const fullName = this.buildFullName(field.fullName, context);
        const parentFullName = context.parentFullName;
        const valueSetXml = this.buildValueSet(field.valueSet);
        const tags = [
            ...this.buildSharedTags(field),
            valueSetXml,
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
            <fullName>${XmlUtils.escapeXml(v.fullName)}</fullName>
            <default>${v.default}</default>
            <label>${XmlUtils.escapeXml(v.label)}</label>
        </value>`).join('');
        return `<valueSet>
        <restricted>${valueSet.restricted}</restricted>
        <valueSetDefinition>
            <sorted>${valueSet.sorted || false}</sorted>${values}
        </valueSetDefinition>
    </valueSet>`;
    }
}

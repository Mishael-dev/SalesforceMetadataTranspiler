// LookupFieldGenerator.ts
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { XmlUtils } from "../../../utils/xmlUtils";
export class LookupFieldGenerator extends BaseFieldGenerator {
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
            XmlUtils.xmlTag("referenceTo", field.referenceTo),
            XmlUtils.xmlTag("relationshipLabel", field.relationshipLabel),
            XmlUtils.xmlTag("relationshipName", field.relationshipName),
            XmlUtils.xmlTag("deleteConstraint", field.deleteConstraint),
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

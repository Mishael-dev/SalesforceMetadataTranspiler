import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { XmlUtils } from "../../../utils/xmlUtils";
export class TextFieldGenerator extends BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 20;
    }
    supports(data) {
        return data.type === "Text";
    }
    generate(field, context) {
        const fullName = this.buildFullName(field.fullName, context);
        const parentFullName = context.parentFullName;
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

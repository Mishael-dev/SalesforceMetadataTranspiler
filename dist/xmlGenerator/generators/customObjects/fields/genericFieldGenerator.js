// GenericFieldGenerator.ts
import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { XmlUtils } from "../../../utils/xmlUtils";
const SIMPLE_FIELD_TYPES = [
    "AutoNumber",
    "Checkbox",
    "Currency",
    "Date",
    "DateTime",
    "Email",
    "Location", // Geolocation
    "Number",
    "Percent",
    "Phone",
    "Text",
    "TextArea",
    "EncryptedText",
    "LongTextArea",
    "Html", // Rich Text
    "Time",
    "Url"
];
export class GenericFieldGenerator extends BaseFieldGenerator {
    constructor() {
        super(...arguments);
        this.priority = 30; // Lower priority than specialized generators
    }
    supports(data) {
        return SIMPLE_FIELD_TYPES.includes(data.type);
    }
    generate(field, context) {
        const fullName = this.buildFullName(field.fullName, context);
        const parentFullName = context.parentFullName;
        const tags = [
            ...this.buildSharedTags(field),
            ...this.buildTypeSpecificTags(field),
        ];
        const xml = this.buildXmlFromTags(tags);
        return {
            metadataType: "CustomField",
            fullName,
            parentFullName,
            xml,
        };
    }
    buildTypeSpecificTags(field) {
        const tags = [];
        // Map all additional properties to XML tags
        const excludedKeys = new Set([
            'type', 'label', 'fullName', 'description', 'inlineHelpText',
            'trackHistory', 'trackTrending', 'externalId', 'required', 'unique'
        ]);
        for (const [key, value] of Object.entries(field)) {
            if (!excludedKeys.has(key) && value !== undefined && value !== null) {
                tags.push(XmlUtils.xmlTag(key, value));
            }
        }
        return tags;
    }
}

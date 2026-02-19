import { XmlUtils } from "../utils/xmlUtils";
export class BaseFieldGenerator {
    buildSharedTags(field) {
        return [
            XmlUtils.xmlTag("fullName", field.fullName),
            XmlUtils.xmlTag("label", field.label),
            XmlUtils.xmlTag("type", field.type),
            XmlUtils.xmlTag("description", field.description),
            XmlUtils.xmlTag("inlineHelpText", field.helpText),
            XmlUtils.xmlTag("trackHistory", field.trackHistory),
            XmlUtils.xmlTag("trackTrending", field.trackTrending),
            XmlUtils.xmlTag("externalId", field.externalId),
            XmlUtils.xmlTag("required", field.required),
            XmlUtils.xmlTag("unique", field.unique),
        ];
    }
    buildFullName(fieldName, context) {
        return context.parentFullName
            ? `${context.parentFullName}.${fieldName}`
            : fieldName;
    }
    buildXmlFromTags(tags) {
        const body = tags.filter((tag) => tag !== "").join("\n    ");
        return XmlUtils.buildFieldXmlDocument("fields", `${body}`);
    }
}

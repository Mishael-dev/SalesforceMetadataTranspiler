"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFieldGenerator = void 0;
const xmlUtils_1 = require("../utils/xmlUtils");
class BaseFieldGenerator {
    buildSharedTags(field) {
        return [
            xmlUtils_1.XmlUtils.xmlTag("fullName", field.fullName),
            xmlUtils_1.XmlUtils.xmlTag("label", field.label),
            xmlUtils_1.XmlUtils.xmlTag("type", field.type),
            xmlUtils_1.XmlUtils.xmlTag("description", field.description),
            xmlUtils_1.XmlUtils.xmlTag("inlineHelpText", field.helpText),
            xmlUtils_1.XmlUtils.xmlTag("trackHistory", field.trackHistory),
            xmlUtils_1.XmlUtils.xmlTag("trackTrending", field.trackTrending),
            xmlUtils_1.XmlUtils.xmlTag("externalId", field.externalId),
            xmlUtils_1.XmlUtils.xmlTag("required", field.required),
            xmlUtils_1.XmlUtils.xmlTag("unique", field.unique),
        ];
    }
    buildFullName(fieldName, context) {
        return context.parentFullName
            ? `${context.parentFullName}.${fieldName}`
            : fieldName;
    }
    buildXmlFromTags(tags) {
        const body = tags.filter((tag) => tag !== "").join("\n    ");
        return xmlUtils_1.XmlUtils.buildFieldXmlDocument("fields", `${body}`);
    }
}
exports.BaseFieldGenerator = BaseFieldGenerator;

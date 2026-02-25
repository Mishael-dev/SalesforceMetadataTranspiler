"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomObjectGenerator = void 0;
const xmlUtils_1 = require("../../utils/xmlUtils");
class CustomObjectGenerator {
    constructor() {
        this.priority = 10;
    }
    supports(data) {
        return (data.type === "CustomObject" &&
            data.label !== undefined &&
            data.pluralLabel !== undefined);
    }
    getChildItems(data) {
        return data.fields || [];
    }
    generate(obj, context) {
        const body = this.buildBody(obj);
        const xml = xmlUtils_1.XmlUtils.buildXmlDocument("CustomObject", "http://soap.sforce.com/2006/04/metadata", `    ${body}`);
        return {
            metadataType: "CustomObject",
            fullName: obj.fullName,
            xml,
        };
    }
    buildBody(obj) {
        const tags = [
            xmlUtils_1.XmlUtils.xmlTag("deploymentStatus", obj.deploymentStatus),
            xmlUtils_1.XmlUtils.xmlTag("description", obj.description),
            xmlUtils_1.XmlUtils.xmlTag("label", obj.label),
            xmlUtils_1.XmlUtils.xmlTag("pluralLabel", obj.pluralLabel),
            this.buildNameField(obj.nameField),
            xmlUtils_1.XmlUtils.xmlTag("allowInChatterGroups", obj.allowInChatterGroups),
            xmlUtils_1.XmlUtils.xmlTag("enableActivities", obj.enableActivities),
            xmlUtils_1.XmlUtils.xmlTag("enableBulkApi", obj.enableBulkApi),
            xmlUtils_1.XmlUtils.xmlTag("enableFeeds", obj.enableFeeds),
            xmlUtils_1.XmlUtils.xmlTag("enableHistory", obj.enableHistory),
            xmlUtils_1.XmlUtils.xmlTag("enableLicensing", obj.enableLicensing),
            xmlUtils_1.XmlUtils.xmlTag("enableReports", obj.enableReports),
            xmlUtils_1.XmlUtils.xmlTag("enableSearch", obj.enableSearch),
            xmlUtils_1.XmlUtils.xmlTag("enableSharing", obj.enableSharing),
            xmlUtils_1.XmlUtils.xmlTag("enableStreamingApi", obj.enableStreamingApi),
            xmlUtils_1.XmlUtils.xmlTag("visibility", obj.visibility),
            xmlUtils_1.XmlUtils.xmlTag("externalSharingModel", obj.externalSharingModel),
            xmlUtils_1.XmlUtils.xmlTag("sharingModel", obj.sharingModel),
        ];
        return tags.filter((tag) => tag !== "").join("\n    ");
    }
    buildNameField(nameField) {
        return `<nameField>
        <label>${xmlUtils_1.XmlUtils.escapeXml(nameField.label)}</label>
        <type>${nameField.type}</type>
        <trackHistory>${nameField.trackHistory}</trackHistory>
    </nameField>`;
    }
}
exports.CustomObjectGenerator = CustomObjectGenerator;

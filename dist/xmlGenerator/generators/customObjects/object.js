import { XmlUtils } from "../../utils/xmlUtils";
export class CustomObjectGenerator {
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
        const xml = XmlUtils.buildXmlDocument("CustomObject", "http://soap.sforce.com/2006/04/metadata", `    ${body}`);
        return {
            metadataType: "CustomObject",
            fullName: obj.fullName,
            xml,
        };
    }
    buildBody(obj) {
        const tags = [
            XmlUtils.xmlTag("deploymentStatus", obj.deploymentStatus),
            XmlUtils.xmlTag("description", obj.description),
            XmlUtils.xmlTag("label", obj.label),
            XmlUtils.xmlTag("pluralLabel", obj.pluralLabel),
            this.buildNameField(obj.nameField),
            XmlUtils.xmlTag("allowInChatterGroups", obj.allowInChatterGroups),
            XmlUtils.xmlTag("enableActivities", obj.enableActivities),
            XmlUtils.xmlTag("enableBulkApi", obj.enableBulkApi),
            XmlUtils.xmlTag("enableFeeds", obj.enableFeeds),
            XmlUtils.xmlTag("enableHistory", obj.enableHistory),
            XmlUtils.xmlTag("enableLicensing", obj.enableLicensing),
            XmlUtils.xmlTag("enableReports", obj.enableReports),
            XmlUtils.xmlTag("enableSearch", obj.enableSearch),
            XmlUtils.xmlTag("enableSharing", obj.enableSharing),
            XmlUtils.xmlTag("enableStreamingApi", obj.enableStreamingApi),
            XmlUtils.xmlTag("visibility", obj.visibility),
            XmlUtils.xmlTag("externalSharingModel", obj.externalSharingModel),
            XmlUtils.xmlTag("sharingModel", obj.sharingModel),
        ];
        return tags.filter((tag) => tag !== "").join("\n    ");
    }
    buildNameField(nameField) {
        return `<nameField>
        <label>${XmlUtils.escapeXml(nameField.label)}</label>
        <type>${nameField.type}</type>
        <trackHistory>${nameField.trackHistory}</trackHistory>
    </nameField>`;
    }
}

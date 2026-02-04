import { AtomicGenerator } from "../atomicGenerator";
import { CustomObject } from "../../types";
import { JsonField } from "../../types";
import { GenerationContext } from "../../types";
import { GeneratedXml } from "../../types";
import { XmlUtils } from "../../utils/xmlUtils";
import { NameField } from "../../types";

export class CustomObjectGenerator implements AtomicGenerator<CustomObject> {
  readonly priority = 10;

  supports(data: any): data is CustomObject {
    return (
      data.type === "CustomObject" &&
      data.label !== undefined &&
      data.pluralLabel !== undefined
    );
  }

  getChildItems(data: CustomObject): JsonField[] {
    return data.fields || [];
  }

  generate(obj: CustomObject, context: GenerationContext): GeneratedXml {
    const body = this.buildBody(obj);

    const xml = XmlUtils.buildXmlDocument(
      "CustomObject",
      "http://soap.sforce.com/2006/04/metadata",
      `    ${body}`,
    );

    return {
      metadataType: "CustomObject",
      fullName: obj.fullName,
      xml,
    };
  }

  private buildBody(obj: CustomObject): string {
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
    ];

    return tags.filter((tag) => tag !== "").join("\n    ");
  }

  private buildNameField(nameField: NameField): string {
    return `<nameField>
        <label>${XmlUtils.escapeXml(nameField.label)}</label>
        <type>${nameField.type}</type>
        <trackHistory>${nameField.trackHistory}</trackHistory>
    </nameField>`;
  }
}

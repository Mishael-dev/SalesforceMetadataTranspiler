export class XmlUtils {
  static escapeXml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  static xmlTag(tag: string, value: any): string {
    if (value === undefined || value === null) return "";
    return `<${tag}>${this.escapeXml(String(value))}</${tag}>`;
  }

  static buildXmlDocument(
    rootTag: string,
    namespace: string,
    body: string,
  ): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<${rootTag} xmlns="${namespace}">
${body}
</${rootTag}>`;
  }
}

export class XmlUtils {
    static escapeXml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }
    static xmlTag(tag, value) {
        if (value === undefined || value === null)
            return "";
        return `<${tag}>${this.escapeXml(String(value))}</${tag}>`;
    }
    static buildFieldXmlDocument(rootTag, body) {
        return `
<${rootTag}>
${body}
</${rootTag}>`;
    }
    static buildXmlDocument(rootTag, namespace, body) {
        return `<?xml version="1.0" encoding="UTF-8"?>
<${rootTag} xmlns="${namespace}">
${body}
</${rootTag}>`;
    }
}

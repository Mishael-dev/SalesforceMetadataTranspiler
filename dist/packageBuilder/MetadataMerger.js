import { XMLParser, XMLBuilder } from 'fast-xml-parser';
export class MetadataMerger {
    constructor() {
        this.parser = new XMLParser({
            ignoreAttributes: false,
            preserveOrder: false,
            allowBooleanAttributes: true,
            // Optimization: Don't parse the XML declaration <?xml...?>
            ignoreDeclaration: true,
        });
        this.builder = new XMLBuilder({
            ignoreAttributes: false,
            format: true,
            suppressEmptyNode: false,
        });
    }
    mergeFields(artifacts) {
        const objectsMap = new Map();
        const fieldsMap = new Map();
        const finalArtifacts = [];
        // 1. Separate Objects and Fields
        for (const art of artifacts) {
            if (art.metadataType === 'CustomObject') {
                objectsMap.set(art.fullName, art);
            }
            else if (art.metadataType === 'CustomField' && art.parentFullName) {
                if (!fieldsMap.has(art.parentFullName)) {
                    fieldsMap.set(art.parentFullName, []);
                }
                fieldsMap.get(art.parentFullName)?.push(art);
            }
            else {
                finalArtifacts.push(art);
            }
        }
        // 2. Merge Fields into Objects
        for (const [objectName, objectArtifact] of objectsMap) {
            const fields = fieldsMap.get(objectName);
            if (!fields || fields.length === 0) {
                finalArtifacts.push(objectArtifact);
                continue;
            }
            // Parse Object XML
            const jsonObj = this.parser.parse(objectArtifact.xml);
            // Ensure <fields> array exists in the parsed JSON
            if (!jsonObj.CustomObject.fields) {
                jsonObj.CustomObject.fields = [];
            }
            else if (!Array.isArray(jsonObj.CustomObject.fields)) {
                jsonObj.CustomObject.fields = [jsonObj.CustomObject.fields];
            }
            // Append parsed field XMLs to the object
            for (const fieldArt of fields) {
                // CHANGED: The parser will now find 'fields' instead of 'CustomField'
                const jsonField = this.parser.parse(fieldArt.xml);
                if (jsonField.fields) {
                    jsonObj.CustomObject.fields.push(jsonField.fields);
                }
            }
            // Rebuild XML
            const mergedXml = this.builder.build(jsonObj);
            finalArtifacts.push({
                ...objectArtifact,
                xml: mergedXml
            });
        }
        return finalArtifacts;
    }
}

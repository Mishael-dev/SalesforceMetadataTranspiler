export class ManifestGenerator {
    constructor() {
        // Map of metadataType to the required <name> in package.xml
        this.typeMapping = {
            'CustomObject': 'CustomObject',
            'ApexClass': 'ApexClass',
            'ApexTrigger': 'ApexTrigger',
            'PermissionSet': 'PermissionSet',
            'LightningComponentBundle': 'LightningComponentBundle',
        };
    }
    generate(artifacts, apiVersion = '60.0') {
        const typesMap = new Map();
        // 1. Group members by type
        for (const art of artifacts) {
            const sfName = this.typeMapping[art.metadataType];
            if (!sfName) {
                console.warn(`Unknown mapping for type: ${art.metadataType}. Skipping in package.xml.`);
                continue;
            }
            if (!typesMap.has(sfName)) {
                typesMap.set(sfName, new Set());
            }
            typesMap.get(sfName)?.add(art.fullName);
        }
        // 2. Build XML string
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">`;
        for (const [sfName, members] of typesMap) {
            xml += `
    <types>`;
            // Sort members for consistent output
            Array.from(members).sort().forEach(member => {
                xml += `
        <members>${member}</members>`;
            });
            xml += `
        <name>${sfName}</name>
    </types>`;
        }
        xml += `
    <version>${apiVersion}</version>
</Package>`;
        return xml;
    }
}

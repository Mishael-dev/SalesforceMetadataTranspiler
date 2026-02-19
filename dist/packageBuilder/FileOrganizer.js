import * as path from 'path';
export class FileOrganizer {
    constructor() {
        // Map of metadataType to folder name and file extension
        this.typeMapping = {
            'CustomObject': { folder: 'objects', ext: '.object' },
            'CustomField': { folder: 'objects', ext: '.field' }, // Should not be used if merged
            'ApexClass': { folder: 'classes', ext: '.cls-meta.xml' },
            'ApexTrigger': { folder: 'triggers', ext: '.trigger-meta.xml' },
            'PermissionSet': { folder: 'permissionsets', ext: '.permissionset-meta.xml' },
            'LightningComponentBundle': { folder: 'lwc', ext: '' }, // LWC needs special handling for directory
        };
    }
    organize(artifacts) {
        const fileMap = new Map();
        for (const art of artifacts) {
            const mapping = this.typeMapping[art.metadataType];
            if (!mapping) {
                console.warn(`Unknown metadata type: ${art.metadataType}. Skipping.`);
                continue;
            }
            // Determine file path
            let filePath = '';
            // Special handling for Lightning Components
            if (art.metadataType === 'LightningComponentBundle') {
                filePath = path.join(mapping.folder, art.fullName, `${art.fullName}.js-meta.xml`);
            }
            else {
                // Standard mapping: folder/FullName.ext
                filePath = path.join(mapping.folder, `${art.fullName}${mapping.ext}`);
            }
            fileMap.set(filePath, art.xml);
        }
        return fileMap;
    }
}

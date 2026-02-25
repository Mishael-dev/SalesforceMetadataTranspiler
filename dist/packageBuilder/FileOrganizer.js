"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileOrganizer = void 0;
const path = __importStar(require("path"));
class FileOrganizer {
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
exports.FileOrganizer = FileOrganizer;

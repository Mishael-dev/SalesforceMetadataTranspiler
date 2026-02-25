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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputHandler = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const jszip_1 = __importDefault(require("jszip"));
class OutputHandler {
    async write(options, files) {
        if (options.outputMode === 'zip') {
            await this.writeZip(options, files);
        }
        else {
            this.writeDirectory(options, files);
        }
    }
    async writeZip(options, files) {
        const zip = new jszip_1.default();
        // Add files to ZIP
        for (const [filePath, content] of files) {
            zip.file(filePath, content);
        }
        // Generate ZIP buffer
        const buffer = await zip.generateAsync({ type: 'nodebuffer' });
        // Ensure output directory exists
        const outputDir = path.dirname(options.outputDirectory);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        // Write to file
        const zipFileName = options.outputDirectory.endsWith('.zip')
            ? options.outputDirectory
            : `${options.outputDirectory}.zip`;
        fs.writeFileSync(zipFileName, buffer);
        console.log(`Package created: ${zipFileName}`);
    }
    writeDirectory(options, files) {
        const baseDir = options.outputDirectory;
        for (const [filePath, content] of files) {
            const fullPath = path.join(baseDir, filePath);
            const fileDir = path.dirname(fullPath);
            // Create subdirectories
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, { recursive: true });
            }
            fs.writeFileSync(fullPath, content);
        }
        console.log(`Package extracted to: ${baseDir}`);
    }
}
exports.OutputHandler = OutputHandler;

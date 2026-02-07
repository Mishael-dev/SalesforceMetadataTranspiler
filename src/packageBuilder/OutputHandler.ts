import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';
import { PackageBuilderOptions } from './types';

export class OutputHandler {
    
    public async write(options: PackageBuilderOptions, files: Map<string, string>): Promise<void> {
        if (options.outputMode === 'zip') {
            await this.writeZip(options, files);
        } else {
            this.writeDirectory(options, files);
        }
    }

    private async writeZip(options: PackageBuilderOptions, files: Map<string, string>): Promise<void> {
        const zip = new JSZip();

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

    private writeDirectory(options: PackageBuilderOptions, files: Map<string, string>): void {
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
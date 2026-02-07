import { PackageBuilderOptions, BuildResult } from './types';
import { GeneratedXml } from '../xmlGenerator/types';
import { MetadataMerger } from './MetadataMerger';
import { FileOrganizer } from './FileOrganizer';
import { ManifestGenerator } from './ManifestGenerator';
import { OutputHandler } from './OutputHandler';

export class PackageBuilder {
    private merger: MetadataMerger;
    private organizer: FileOrganizer;
    private manifestGen: ManifestGenerator;
    private outputHandler: OutputHandler;

    constructor(private options: PackageBuilderOptions) {
        this.merger = new MetadataMerger();
        this.organizer = new FileOrganizer();
        this.manifestGen = new ManifestGenerator();
        this.outputHandler = new OutputHandler();
    }

    public async build(artifacts: GeneratedXml[]): Promise<BuildResult> {
        try {
            // 1. Merge CustomFields into CustomObjects
            const mergedArtifacts = this.merger.mergeFields(artifacts);

            // 2. Organize artifacts into a file path -> content map
            const fileMap = this.organizer.organize(mergedArtifacts);

            // 3. Generate package.xml and add to the map
            const packageXml = this.manifestGen.generate(mergedArtifacts);
            fileMap.set('package.xml', packageXml);

            // 4. Write to disk (Zip or Directory)
            await this.outputHandler.write(this.options, fileMap);

            return {
                success: true,
                outputPath: this.options.outputDirectory,
                filesWritten: Array.from(fileMap.keys())
            };
        } catch (error) {
            return {
                success: false,
                outputPath: this.options.outputDirectory,
                filesWritten: [],
                errors: [error instanceof Error ? error.message : String(error)]
            };
        }
    }
}
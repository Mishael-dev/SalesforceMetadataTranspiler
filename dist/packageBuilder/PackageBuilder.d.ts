import { PackageBuilderOptions, BuildResult } from './types';
import { GeneratedXml } from '../xmlGenerator/types';
export declare class PackageBuilder {
    private options;
    private merger;
    private organizer;
    private manifestGen;
    private outputHandler;
    constructor(options: PackageBuilderOptions);
    build(artifacts: GeneratedXml[]): Promise<BuildResult>;
}
//# sourceMappingURL=PackageBuilder.d.ts.map
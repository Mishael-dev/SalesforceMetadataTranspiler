import { PackageBuilderOptions } from './types';
export declare class OutputHandler {
    write(options: PackageBuilderOptions, files: Map<string, string>): Promise<void>;
    private writeZip;
    private writeDirectory;
}
//# sourceMappingURL=OutputHandler.d.ts.map
import { TranspilerConfig } from "./types/transpilerConfig";
import { GeneratedXml } from "./xmlGenerator/types";
type GeneratedXmlArray = GeneratedXml[];
declare class SalesforceMetadataTranspiler {
    private readonly validator;
    private readonly config;
    private readonly xmlGenerator;
    constructor(config: TranspilerConfig);
    transpile(input: unknown): Promise<GeneratedXmlArray>;
}
export { SalesforceMetadataTranspiler };
//# sourceMappingURL=salesforceMetadataTranspiler.d.ts.map
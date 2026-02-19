import { AtomicGenerator } from "./generators/atomicGenerator";
import { GeneratedXml } from "./types";
export declare class XmlGenerator {
    private generators;
    registerGenerator(gen: AtomicGenerator): void;
    generate(input: any): GeneratedXml[];
    private processRecursive;
}
//# sourceMappingURL=orchestrator.d.ts.map
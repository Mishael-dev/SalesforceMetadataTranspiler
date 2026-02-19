import { GenerationContext } from "../types";
import { GeneratedXml } from "../types";
export interface AtomicGenerator<T = any> {
    readonly priority: number;
    supports(data: any): data is T;
    generate(data: T, context: GenerationContext): GeneratedXml;
    getChildItems?(data: T): any[];
}
//# sourceMappingURL=atomicGenerator.d.ts.map
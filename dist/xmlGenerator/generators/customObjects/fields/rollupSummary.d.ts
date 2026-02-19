import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { SummaryField } from "../../../types";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
export declare class SummaryFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<SummaryField> {
    readonly priority = 20;
    supports(data: any): data is SummaryField;
    generate(field: SummaryField, context: GenerationContext): GeneratedXml;
}
//# sourceMappingURL=rollupSummary.d.ts.map
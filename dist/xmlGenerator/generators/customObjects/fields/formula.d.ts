import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { FormulaField } from "../../../types";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
export declare class FormulaFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<FormulaField> {
    readonly priority = 20;
    supports(data: any): data is FormulaField;
    generate(field: FormulaField, context: GenerationContext): GeneratedXml;
}
//# sourceMappingURL=formula.d.ts.map
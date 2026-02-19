import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { LookupField } from "../../../types";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
export declare class LookupFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<LookupField> {
    readonly priority = 20;
    supports(data: any): data is LookupField;
    generate(field: LookupField, context: GenerationContext): GeneratedXml;
}
//# sourceMappingURL=lookUp.d.ts.map
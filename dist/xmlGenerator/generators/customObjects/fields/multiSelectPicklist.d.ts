import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { MultiselectPicklistField } from "../../../types";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
export declare class MultiselectPicklistFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<MultiselectPicklistField> {
    readonly priority = 20;
    supports(data: any): data is MultiselectPicklistField;
    generate(field: MultiselectPicklistField, context: GenerationContext): GeneratedXml;
    private buildValueSet;
}
//# sourceMappingURL=multiSelectPicklist.d.ts.map
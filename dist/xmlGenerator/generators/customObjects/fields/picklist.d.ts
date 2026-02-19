import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { PicklistField } from "../../../types";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
export declare class PicklistFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<PicklistField> {
    readonly priority = 20;
    supports(data: any): data is PicklistField;
    generate(field: PicklistField, context: GenerationContext): GeneratedXml;
    private buildValueSet;
}
//# sourceMappingURL=picklist.d.ts.map
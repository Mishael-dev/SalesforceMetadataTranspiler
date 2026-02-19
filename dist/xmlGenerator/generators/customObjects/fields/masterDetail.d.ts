import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { MasterDetailField } from "../../../types";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
export declare class MasterDetailFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<MasterDetailField> {
    readonly priority = 20;
    supports(data: any): data is MasterDetailField;
    generate(field: MasterDetailField, context: GenerationContext): GeneratedXml;
}
//# sourceMappingURL=masterDetail.d.ts.map
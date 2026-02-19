import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
import { BaseJsonField } from "../../../types";
export declare class GenericFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<BaseJsonField> {
    readonly priority = 30;
    supports(data: any): data is BaseJsonField;
    generate(field: BaseJsonField, context: GenerationContext): GeneratedXml;
    private buildTypeSpecificTags;
}
//# sourceMappingURL=genericFieldGenerator.d.ts.map
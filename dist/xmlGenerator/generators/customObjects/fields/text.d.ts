import { BaseFieldGenerator } from "../../baseFieldGenerator";
import { AtomicGenerator } from "../../atomicGenerator";
import { TextField } from "../../../types";
import { GenerationContext } from "../../../types";
import { GeneratedXml } from "../../../types";
export declare class TextFieldGenerator extends BaseFieldGenerator implements AtomicGenerator<TextField> {
    readonly priority = 20;
    supports(data: any): data is TextField;
    generate(field: TextField, context: GenerationContext): GeneratedXml;
}
//# sourceMappingURL=text.d.ts.map
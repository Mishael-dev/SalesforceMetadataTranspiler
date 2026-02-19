import { AtomicGenerator } from "../atomicGenerator";
import { CustomObject } from "../../types";
import { JsonField } from "../../types";
import { GenerationContext } from "../../types";
import { GeneratedXml } from "../../types";
export declare class CustomObjectGenerator implements AtomicGenerator<CustomObject> {
    readonly priority = 10;
    supports(data: any): data is CustomObject;
    getChildItems(data: CustomObject): JsonField[];
    generate(obj: CustomObject, context: GenerationContext): GeneratedXml;
    private buildBody;
    private buildNameField;
}
//# sourceMappingURL=object.d.ts.map
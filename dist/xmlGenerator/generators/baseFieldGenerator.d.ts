import { GenerationContext } from "../types";
export declare abstract class BaseFieldGenerator {
    protected buildSharedTags(field: any): string[];
    protected buildFullName(fieldName: string, context: GenerationContext): string;
    protected buildXmlFromTags(tags: string[]): string;
}
//# sourceMappingURL=baseFieldGenerator.d.ts.map
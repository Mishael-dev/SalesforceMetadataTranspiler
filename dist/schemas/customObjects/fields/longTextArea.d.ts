import { z } from "zod";
/**
 * Zod schema for Salesforce LongTextArea field: text_area_long__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export declare const LongTextAreaFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"LongTextArea">;
    length: z.ZodNumber;
    visibleLines: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=longTextArea.d.ts.map
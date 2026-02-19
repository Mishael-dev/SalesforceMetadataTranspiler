import { z } from "zod";
/**
 * Zod schema for Salesforce URL field: url__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export declare const UrlFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Url">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=url.d.ts.map
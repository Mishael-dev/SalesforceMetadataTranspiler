import { z } from "zod";
/**
 * Zod schema for Salesforce Time field: time__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export declare const TimeFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Time">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=time.d.ts.map
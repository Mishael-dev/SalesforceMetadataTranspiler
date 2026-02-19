import { z } from "zod";
/**
 * Zod schema for Salesforce Percent field: percent__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations (platform constraints, pre-flight) are not enforced here.
 */
export declare const PercentFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Percent">;
    precision: z.ZodNumber;
    scale: z.ZodNumber;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=percent.d.ts.map
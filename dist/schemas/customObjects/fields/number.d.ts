import { z } from "zod";
/**
 * Zod schema for Salesforce Number field: number__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export declare const NumberFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Number">;
    precision: z.ZodNumber;
    scale: z.ZodNumber;
    required: z.ZodBoolean;
    unique: z.ZodBoolean;
    isAIPredictionField: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=number.d.ts.map
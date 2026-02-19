import { z } from 'zod';
/**
 * Zod schema for Salesforce Currency field: currency__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 rules (platform & pre-flight) are NOT handled in this schema
 */
export declare const CurrencyFieldSchema: z.ZodObject<{
    type: z.ZodLiteral<"Currency">;
    fullName: z.ZodString;
    label: z.ZodString;
    defaultValue: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    precision: z.ZodNumber;
    scale: z.ZodNumber;
    required: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=currency.d.ts.map
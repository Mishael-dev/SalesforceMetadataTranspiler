import { z } from 'zod';
/**
 * Zod schema for Salesforce DateTime field: date_time__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export declare const DateTimeFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"DateTime">;
    defaultValue: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=dateTime.d.ts.map
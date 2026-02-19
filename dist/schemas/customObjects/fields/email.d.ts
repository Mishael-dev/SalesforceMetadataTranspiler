import { z } from 'zod';
/**
 * Zod schema for Salesforce Email field: email__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation (including cross-field dependency)
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export declare const EmailFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Email">;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
    caseSensitive: z.ZodBoolean;
    unique: z.ZodBoolean;
    externalId: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=email.d.ts.map
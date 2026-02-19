import { z } from 'zod';
/**
 * Checkbox Field Schema
 * fullName: checkbox__c
 * label: checkbox
 */
export declare const CheckboxFieldSchema: z.ZodObject<{
    type: z.ZodLiteral<"Checkbox">;
    fullName: z.ZodString;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    defaultValue: z.ZodBoolean;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Level 3: Platform Constraints (NOT handled here)
 * - fullName length (excluding "__c") <= 40 characters
 * - label length <= 40 characters
 * - inlineHelpText length <= 255 characters
 * - Checkbox fields cannot be externalId or unique
 * - Checkbox fields cannot be encrypted
 * - Checkbox fields cannot be roll-up summary targets
 *
 * Level 4: State & Conflict Validation (NOT handled here)
 * - Existing field conflicts on target object
 * - Prevent type changes or conversions
 * - Managed package locking
 * - Namespace collisions
 */
//# sourceMappingURL=checkBox.d.ts.map
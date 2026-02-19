import { z } from 'zod';
/**
 * AutoNumber Field Schema
 *
 * Based strictly on:
 * - JSON Shape (source of truth)
 * - Level 1 & Level 2 validation rules only
 *
 * Field reference example:
 * fullName: Asset_ID__c
 * label: Asset ID
 */
export declare const AutoNumberFieldSchema: z.ZodObject<{
    type: z.ZodLiteral<"AutoNumber">;
    label: z.ZodString;
    fullName: z.ZodString;
    displayFormat: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    startingNumber: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodDefault<z.ZodBoolean>;
    trackHistory: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * NOT HANDLED:
 *
 * Level 3: Platform Constraints
 * - Maximum character limits
 * - displayFormat token validation
 * - Numeric placeholder enforcement
 * - Encryption, uniqueness, lookup filter restrictions
 *
 * Level 4: State & Conflict Validation
 * - Existing field mutation checks
 * - Managed package lock validation
 * - Org-level namespace and collision detection
 *
 * These must be enforced by the transpiler or pre-deployment logic.
 */
//# sourceMappingURL=autoNumber.d.ts.map
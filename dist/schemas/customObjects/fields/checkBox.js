"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Checkbox Field Schema
 * fullName: checkbox__c
 * label: checkbox
 */
exports.CheckboxFieldSchema = zod_1.z
    .object({
    /**
     * Level 1: Structural Validation
     */
    type: zod_1.z
        .literal('Checkbox')
        .describe('Declares the Salesforce field type and must be exactly "Checkbox".'),
    fullName: zod_1.z
        .string()
        .nonempty()
        .endsWith('__c')
        .describe('API name of the field. Must be non-empty, unique on the object, and end with "__c".'),
    label: zod_1.z
        .string()
        .nonempty()
        .describe('Human-readable label displayed in the Salesforce UI.'),
    description: zod_1.z
        .string()
        .optional()
        .describe('Optional description for admins and developers.'),
    inlineHelpText: zod_1.z
        .string()
        .optional()
        .describe('Optional contextual help text shown to end users.'),
    defaultValue: zod_1.z
        .boolean()
        .describe('Default boolean value applied when a new record is created for this Checkbox field.'),
    trackHistory: zod_1.z
        .boolean()
        .optional()
        .describe('Controls whether changes to this Checkbox field are tracked in Field History.'),
    trackTrending: zod_1.z
        .boolean()
        .optional()
        .describe('Controls whether the field is tracked for trend analytics. Typically system-managed.'),
})
    /**
     * Level 2: Logical Validation
     */
    .superRefine((data, ctx) => {
    /**
     * Level 2: Logical Validation (Cross-field / contextual)
     */
    // defaultValue must be a literal boolean (no expressions or formulas)
    // (Structurally enforced by z.boolean, but explicitly guarded here for clarity)
    if (typeof data.defaultValue !== 'boolean') {
        ctx.addIssue({
            code: 'custom',
            path: ['defaultValue'],
            message: 'defaultValue must be either true or false for Checkbox fields',
        });
    }
    // trackHistory depends on object-level Field History Tracking (cannot be fully validated here)
    if (data.trackHistory === true) {
        ctx.addIssue({
            code: 'custom',
            path: ['trackHistory'],
            message: 'trackHistory can only be enabled if Field History Tracking is enabled on the object',
        });
    }
});
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

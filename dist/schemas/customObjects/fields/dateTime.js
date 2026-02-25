"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Salesforce DateTime field: date_time__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
exports.DateTimeFieldSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .nonempty({ message: 'fullName is required' }) // Level 1
        .regex(/^[a-zA-Z0-9_]+__c$/, { message: 'fullName must be a valid Salesforce API name ending with __c' })
        .describe('API name of the custom field, must end with __c'),
    label: zod_1.z
        .string()
        .nonempty({ message: 'label is required' }) // Level 1
        .describe('Field label displayed in the UI'),
    type: zod_1.z
        .literal('DateTime')
        .describe('Field type, must be exactly DateTime'), // Level 1
    defaultValue: zod_1.z
        .string()
        .optional()
        .refine(val => !val || val === 'NOW()' || /^DATETIME\(\d{4},\d{1,2},\d{1,2},\d{1,2},\d{1,2},\d{1,2}\)$/.test(val), { message: 'defaultValue must be NOW() or a valid Salesforce DATETIME() expression' } // Level 2
    )
        .describe('Default DateTime value, must follow Salesforce NOW() or DATETIME(YYYY,MM,DD,HH,MM,SS) syntax'),
    description: zod_1.z
        .string()
        .optional()
        .describe('Optional description of the field'),
    inlineHelpText: zod_1.z
        .string()
        .optional()
        .describe('Inline help text displayed in the UI'),
    required: zod_1.z
        .boolean()
        .describe('Whether the field is mandatory') // Level 1
}).refine(data => data.required === false || !!data.defaultValue, {
    message: 'required cannot be true without a defaultValue or context to provide a value', // Level 2 logical validation
    path: ['required'],
});

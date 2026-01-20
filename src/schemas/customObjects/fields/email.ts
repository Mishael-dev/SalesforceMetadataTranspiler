import { z } from 'zod';

/**
 * Zod schema for Salesforce Email field: email__c
 * 
 * Level 1: Structural Validation
 * Level 2: Logical Validation (including cross-field dependency)
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export const EmailFieldSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: 'fullName is required' }) // Level 1
    .regex(/^[a-zA-Z0-9_]+__c$/, { message: 'fullName must be a valid Salesforce API name ending with __c' })
    .describe('API name of the custom field, must end with __c'),

  label: z
    .string()
    .nonempty({ message: 'label is required' }) // Level 1
    .describe('Field label displayed in the UI'),

  type: z
    .literal('Email')
    .describe('Field type, must be exactly Email'), // Level 1

  description: z
    .string()
    .optional()
    .describe('Optional description of the field'),

  inlineHelpText: z
    .string()
    .optional()
    .describe('Inline help text displayed in the UI'),

  required: z
    .boolean()
    .describe('Whether the field is mandatory'), // Level 1

  caseSensitive: z
    .boolean()
    .describe('Whether uniqueness and comparison is case sensitive'), // Level 1

  unique: z
    .boolean()
    .describe('Whether the field must be unique across the object'), // Level 1

  externalId: z
    .boolean()
    .describe('Whether the field is an external ID'), // Level 1

}).superRefine((data, ctx) => {
  /**
   * Level 2: Logical Validation
   */

  // Cross-field dependency: externalId cannot be true if unique is false
  if (data.externalId && !data.unique) {
    ctx.addIssue({
      code: "custom",
      path: ['externalId'],
      message: 'externalId cannot be true if unique is false',
    });
  }
});

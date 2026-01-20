import { z } from 'zod';

/**
 * Zod schema for Salesforce Location (Geolocation) field: geolocation__c
 * 
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export const GeoLocationFieldSchema = z.object({
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
    .literal('Location')
    .describe('Field type, must be exactly Location'), // Level 1

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

  displayLocationInDecimal: z
    .boolean()
    .describe('Whether the location is stored in decimal degrees'), // Level 1

  scale: z
    .number()
    .int({ message: 'scale must be an integer' }) // Level 1
    .nonnegative({ message: 'scale must be non-negative' }) // Level 1
    .refine(val => val >= 0 && val <= 18, { message: 'scale must be between 0 and 18 for Salesforce Location fields' }) // Level 2
    .describe('Precision scale of the location field, 0–18'),

});

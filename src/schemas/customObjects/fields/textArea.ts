import { z } from 'zod';

/**
 * Zod schema for Salesforce TextArea field: text_area__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export const TextAreaFieldSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: 'fullName is required' })
    .regex(/^[a-zA-Z0-9_]+__c$/, { message: 'fullName must end with __c' })
    .describe('API name of the custom field'),

  label: z
    .string()
    .nonempty({ message: 'label is required' })
    .describe('Field label displayed in the UI'),

  type: z.literal('TextArea').describe('Field type, must be exactly TextArea'),

  required: z.boolean().describe('Whether the field is required'),

  description: z.string().optional().describe('Optional field description'),

  inlineHelpText: z.string().optional().describe('Inline help text displayed in the UI'),

  trackHistory: z.boolean().optional().describe('Track field history'),
  trackTrending: z.boolean().optional().describe('Track trending changes')
})

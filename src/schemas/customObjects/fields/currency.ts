import { z } from 'zod';

/**
 * Zod schema for Salesforce Currency field: currency__c
 * 
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 rules (platform & pre-flight) are NOT handled in this schema
 */
export const CurrencyFieldSchema = z.object({
  type: z.literal('Currency').describe('Field type must be exactly "Currency"'), // Level 1

  fullName: z
    .string()
    .nonempty()
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*__c$/, 'fullName must be a valid Salesforce custom field API name ending with __c') // Level 1
    .describe('API name of the custom field, must end with __c'),

  label: z.string().nonempty().describe('The display label for the currency field'), // Level 1

  defaultValue: z
    .number()
    .optional()
    .describe('The default numeric value for the currency field, if required'), // Level 1

  description: z.string().optional().describe('Optional description of the field'), // Level 1
  inlineHelpText: z.string().optional().describe('Optional inline help text for the field'), // Level 1

  precision: z
    .number()
    .int()
    .positive()
    .describe('Total number of digits allowed for the currency value'), // Level 1

  scale: z
    .number()
    .int()
    .min(0)
    .describe('Number of digits allowed after the decimal point'), // Level 1

  required: z.boolean().describe('Indicates whether the field is required'), // Level 1
}).superRefine((data, ctx) => {
  /**
   * Level 2: Logical Validation
   */

  // scale cannot exceed precision
  if (data.scale > data.precision) {
    ctx.addIssue({
      path: ['scale'],
      code: 'custom',
      message: 'scale cannot exceed precision',
    });
  }

  // defaultValue must fit within precision and scale
  if (data.defaultValue !== undefined) {
    const [integerPart, decimalPart = ''] = data.defaultValue.toString().split('.');
    if (integerPart.length + decimalPart.length > data.precision) {
      ctx.addIssue({
        path: ['defaultValue'],
        code: 'custom',
        message: `defaultValue exceeds precision of ${data.precision} digits`,
      });
    }
    if (decimalPart.length > data.scale) {
      ctx.addIssue({
        path: ['defaultValue'],
        code: 'custom',
        message: `defaultValue exceeds scale of ${data.scale} digits`,
      });
    }
  }

  // required fields must have a defaultValue
  if (data.required && data.defaultValue === undefined) {
    ctx.addIssue({
      path: ['defaultValue'],
      code: 'custom',
      message: 'required currency fields must provide a defaultValue',
    });
  }
});

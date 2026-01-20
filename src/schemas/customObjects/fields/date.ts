import { z } from 'zod';

export const DateFieldSchema = z.object({
  type: z.literal('Date'),
  
  fullName: z.string()
    .min(1, 'fullName is required')
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*__c$/, 'fullName must start with a letter and end with __c'),

  label: z.string().min(1, 'label is required'),

  // Level 2: Improved Date Formula Regex
  defaultValue: z.string()
    .regex(/^DATE\(\d{4},\s?\d{1,2},\s?\d{1,2}\)$|^TODAY\(\)$/, {
      message: 'defaultValue must be DATE(YYYY, MM, DD) or TODAY()'
    })
    .optional(),

  required: z.boolean().default(false),
  description: z.string().optional(),
  inlineHelpText: z.string().optional(),
});
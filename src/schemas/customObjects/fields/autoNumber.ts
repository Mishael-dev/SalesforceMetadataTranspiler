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
export const AutoNumberFieldSchema = z
  .object({
    /**
     * Level 1: Structural Validation
     */

    type: z
      .literal('AutoNumber')
      .describe('Salesforce field type. Must be exactly AutoNumber.'),

    label: z
      .string()
      .nonempty()
      .describe('User-facing label for the AutoNumber field.'),

    fullName: z
      .string()
      .regex(/^[A-Za-z][A-Za-z0-9_]*__c$/, {
        message:
          'fullName must be a valid Salesforce custom field API name ending with __c',
      })
      .describe(
        'API name of the AutoNumber field. Must end with __c and follow Salesforce naming rules.',
      ),

    displayFormat: z
      .string()
      .nonempty()
      .describe(
        'Format pattern used to generate AutoNumber values (e.g., ASSET-{YYYY}-{0000}).',
      ),

    description: z
      .string()
      .optional()
      .describe(
        'Optional description explaining the purpose of the AutoNumber field.',
      ),

    inlineHelpText: z
      .string()
      .optional()
      .describe(
        'Optional help text displayed to users in the Salesforce UI.',
      ),

    startingNumber: z
      .number()
      .optional()
      .describe(
        'Starting numeric value for the AutoNumber sequence.',
      ),

    /**
     * Supporting UI-controlled fields
     */

    externalId: z
      .boolean()
      .default(false)
      .describe(
        'Indicates whether the field is marked as an External ID. Must always be false for AutoNumber fields.',
      ),

    trackHistory: z
      .boolean()
      .default(false)
      .describe(
        'Controls whether changes to this field are tracked in field history.',
      ),
  })
  .superRefine((data, ctx) => {
  if (!data.displayFormat || data.displayFormat.trim() === '') {
    ctx.addIssue({
      code: 'custom', // Add this line
      path: ['displayFormat'],
      message: 'displayFormat is required for AutoNumber fields',
    });
  }

  if (data.startingNumber !== undefined && data.startingNumber < 0) {
    ctx.addIssue({
      code: 'custom', // Add this line
      path: ['startingNumber'],
      message: 'startingNumber must be greater than or equal to 0',
    });
  }

  if (data.externalId === true) {
    ctx.addIssue({
      code: 'custom', // Add this line
      path: ['externalId'],
      message: 'AutoNumber fields cannot be marked as External IDs',
    });
  }
});

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

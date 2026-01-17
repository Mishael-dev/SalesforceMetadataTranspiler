import { z } from "zod";

export const FormulaFieldSchema = z.object({
  type: z.literal('Formula')
    .describe("The Salesforce metadata type identifier for this field."),

  label: z.string()
    .describe("The user-friendly name of the formula field seen in the Salesforce UI."),

  fullName: z.string()
    .describe("The unique API name for the field. Must end with '__c' (e.g., 'Formula_Field__c')."),

  returnType: z.enum(['Checkbox', 'Currency', 'Date', 'DateTime', 'Number', 'Percent', 'Text', 'Time'])
    .default('Text')
    .describe("The data type returned by the formula calculation."),

  formula: z.string()
    .describe("The actual logic of the formula. Note: Use standard Salesforce formula syntax."),

  blankOption: z.enum(['BlankAsBlank', 'BlankAsZero'])
    .default('BlankAsZero')
    .describe("Determines how the formula engine handles empty or null fields in the calculation."),

  description: z.string().optional()
    .describe("Internal documentation for admins explaining the logic behind this formula."),

  helpText: z.string().optional()
    .describe("The help bubble text that explains the calculated value to end-users."),

  externalId: z.boolean().default(false)
    .describe("Indicates whether this field can be used as a unique identifier from an external system."),

  required: z.boolean().default(false)
    .describe("Whether this field is required (though formula fields are generally read-only)."),

  unique: z.boolean().default(false)
    .describe("Whether the calculated value must be unique across all records."),

  trackHistory: z.boolean().default(false)
    .describe("If true, Salesforce tracks changes to this field in the History related list."),
});

export type FormulaFieldType = z.infer<typeof FormulaFieldSchema>;
import { z } from "zod";

const AutoNumberFieldSchema = z.object({
  type: z.literal('AutoNumber')
    .describe("The Salesforce metadata type identifier for this field."),

  label: z.string()
    .describe("The user-friendly name of the field seen in the Salesforce UI."),

  fullName: z.string()
    .describe("The unique API name for the field. Must end with '__c' (e.g., 'Serial_Number__c')."),

  displayFormat: z.string()
    .min(3)
    .regex(/\{0+\}/, {
      message: "Display Format must contain a sequence placeholder like {0}, {00}, or {0000}."
    })
    .refine((val) => !/[!@#$%^&*]/.test(val), "Format contains invalid special characters.")
    .describe("The pattern used to generate IDs. Use {0} for numbers and {YYYY} for years. Example: 'INV-{YYYY}-{0000}'."),

  description: z.string().optional()
    .describe("Internal documentation for admins explaining the purpose of this field."),

  helpText: z.string().optional()
    .describe("The 'i' bubble text that helps end-users understand what to do with this field."),

  startingNumber: z.number().default(1)
    .describe("The first number the robot stamper will use (e.g., if set to 100, the first record is 100, then 101)."),
});
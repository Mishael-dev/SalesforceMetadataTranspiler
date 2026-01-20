import { z } from "zod";

/**
 * Zod schema for Salesforce Percent field: percent__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations (platform constraints, pre-flight) are not enforced here.
 */
export const PercentFieldSchema = z
  .object({
    fullName: z
      .string()
      .nonempty({ message: "fullName is required" })
      .regex(/^[a-zA-Z0-9_]+__c$/, { message: "fullName must end with __c" })
      .describe("API name of the custom field"),

    label: z
      .string()
      .nonempty({ message: "label is required" })
      .describe("Field label displayed in the UI"),

    type: z.literal("Percent").describe("Field type, must be exactly Percent"),

    precision: z
      .number()
      .int({ message: "precision must be an integer" })
      .min(1, { message: "precision must be at least 1" })
      .max(18, { message: "precision cannot exceed 18" })
      .describe("Total number of digits allowed"),

    scale: z
      .number()
      .int({ message: "scale must be an integer" })
      .min(0, { message: "scale cannot be negative" })
      .describe("Number of digits to the right of the decimal point"),

    required: z.boolean().describe("Whether the field is required"),

    description: z
      .string()
      .optional()
      .describe("Optional description of the field"),

    inlineHelpText: z
      .string()
      .optional()
      .describe("Inline help text displayed in the UI"),
  })
  .superRefine((data, ctx) => {
    // Level 2: Logical Validation

    if (data.scale > data.precision) {
      ctx.addIssue({
        code: "custom",
        path: ["scale"],
        message: "scale cannot be greater than precision",
      });
    }

    // Optional business rule: Percent should normally be 0–100
    // Note: Salesforce allows storage >100, but you can add a refinement here if needed.
  });

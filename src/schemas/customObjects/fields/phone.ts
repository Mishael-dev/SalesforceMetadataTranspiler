import { z } from "zod";

/**
 * Zod schema for Salesforce Phone field: phone__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export const PhoneFieldSchema = z
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

    type: z.literal("Phone").describe("Field type, must be exactly Phone"),

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
    // Optional: check for characters that are valid for Salesforce Phone fields
    const phonePattern = /^[0-9+\-\(\)\s]*$/;
    if (data.inlineHelpText && !phonePattern.test(data.inlineHelpText)) {
      ctx.addIssue({
        code: "custom",
        path: ["inlineHelpText"],
        message: "inlineHelpText contains invalid characters for a Phone field",
      });
    }
  });

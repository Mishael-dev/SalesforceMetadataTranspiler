import { z } from "zod";

/**
 * Zod schema for Salesforce LongTextArea field: text_area_long__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export const LongTextAreaFieldSchema = z
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

    type: z
      .literal("LongTextArea")
      .describe("Field type, must be exactly LongTextArea"),

    length: z
      .number()
      .int()
      .min(1, { message: "length must be at least 1" })
      .max(32768, { message: "length cannot exceed 32768" })
      .describe("Maximum number of characters"),

    visibleLines: z
      .number()
      .int()
      .min(1, { message: "visibleLines must be at least 1" })
      .describe("Number of visible lines in UI"),

    description: z.string().optional().describe("Optional field description"),
    inlineHelpText: z
      .string()
      .optional()
      .describe("Inline help text displayed in the UI"),
    trackHistory: z.boolean().optional().describe("Track field history"),
    trackTrending: z.boolean().optional().describe("Track trending changes"),
  })
  .superRefine((data, ctx) => {
    // Level 2: Logical Validation
    if (data.visibleLines < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["visibleLines"],
        message: "visibleLines must be a positive integer",
      });
    }
  });

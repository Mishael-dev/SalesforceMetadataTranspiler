import { z } from "zod";

/**
 * Zod schema for Salesforce Encrypted Text Area field: text_area_encrypted__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export const EncryptedTextFieldSchema = z
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
      .literal("EncryptedText")
      .describe("Field type, must be exactly EncryptedText"),

    required: z.boolean().describe("Whether the field is required"),

    length: z
      .number()
      .int()
      .min(1, { message: "length must be at least 1" })
      .max(175, { message: "length cannot exceed 175" })
      .describe("Length of the encrypted text"),

    maskChar: z
      .enum(["asterisk", "numberSign"])
      .describe("Mask character for encrypted field"),

    maskType: z
      .enum(["ssn", "creditCard", "password"])
      .describe("Mask type for encrypted field"),

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
    // Mask type should correspond to maskChar (simplified check)
    if (data.maskType === "ssn" && data.maskChar !== "asterisk") {
      ctx.addIssue({
        code: "custom",
        path: ["maskChar"],
        message: "SSN maskType must use asterisk as maskChar",
      });
    }

    // Required fields must comply with length constraints (implicit)
  });

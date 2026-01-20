import { z } from "zod";

/**
 * Zod schema for Salesforce Lookup field: Lookup_Field__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation (cross-field dependencies)
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export const LookupFieldSchema = z
  .object({
    fullName: z
      .string()
      .nonempty({ message: "fullName is required" }) // Level 1
      .regex(/^[a-zA-Z0-9_]+__c$/, {
        message: "fullName must be a valid Salesforce API name ending with __c",
      })
      .describe("API name of the custom field, must end with __c"),

    label: z
      .string()
      .nonempty({ message: "label is required" }) // Level 1
      .describe("Field label displayed in the UI"),

    type: z.literal("Lookup").describe("Field type, must be exactly Lookup"), // Level 1

    referenceTo: z
      .string()
      .nonempty({ message: "referenceTo is required" }) // Level 1
      .describe("API name of the parent object this field references"),

    relationshipName: z
      .string()
      .nonempty({ message: "relationshipName is required" }) // Level 1
      .describe("API name used for child-to-parent traversal"),

    relationshipLabel: z
      .string()
      .nonempty({ message: "relationshipLabel is required" }) // Level 1
      .describe("Label for the related list in the UI"),

    deleteConstraint: z
      .enum(["SetNull", "Restrict"])
      .describe("Behavior when parent record is deleted"), // Level 1 + Level 2

    description: z
      .string()
      .optional()
      .describe("Optional description of the field"),

    inlineHelpText: z
      .string()
      .optional()
      .describe("Inline help text displayed in the UI"),

    required: z.boolean().describe("Whether the field is mandatory"), // Level 1
  })
  .superRefine((data, ctx) => {
    /**
     * Level 2: Logical Validation
     */

    // relationshipName must exist if referenceTo exists
    if (data.referenceTo && !data.relationshipName) {
      ctx.addIssue({
        code: "custom",
        path: ["relationshipName"],
        message:
          "relationshipName must be provided when referenceTo is defined",
      });
    }

    // relationshipLabel must exist if relationshipName exists
    if (data.relationshipName && !data.relationshipLabel) {
      ctx.addIssue({
        code: "custom",
        path: ["relationshipLabel"],
        message:
          "relationshipLabel must be provided when relationshipName is defined",
      });
    }

    // required = true only allowed when deleteConstraint = Restrict
    if (data.required && data.deleteConstraint !== "Restrict") {
      ctx.addIssue({
        code: "custom",
        path: ["required"],
        message: "required can only be true when deleteConstraint is Restrict",
      });
    }
  });

import { z } from "zod";

/**
 * Zod schema for Salesforce Master-Detail field: master_detail__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export const MasterDetailFieldSchema = z
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

    type: z
      .literal("MasterDetail")
      .describe("Field type, must be exactly MasterDetail"), // Level 1

    referenceTo: z
      .string()
      .nonempty({ message: "referenceTo is required" }) // Level 1
      .describe("API name of the parent object this field references"),

    relationshipLabel: z
      .string()
      .nonempty({ message: "relationshipLabel is required" }) // Level 1
      .describe("Label for the related list in the UI"),

    relationshipName: z
      .string()
      .nonempty({ message: "relationshipName is required" }) // Level 1
      .describe("API name used for child-to-parent traversal"),

    relationshipOrder: z
      .number()
      .int({ message: "relationshipOrder must be an integer" })
      .nonnegative({ message: "relationshipOrder must be non-negative" }) // Level 1
      .describe("Display order for roll-up summaries"),

    reparentableMasterDetail: z
      .boolean()
      .describe(
        "Whether child records can be reassigned to a different parent",
      ), // Level 1

    writeRequiresMasterRead: z
      .boolean()
      .describe("Whether write access to child requires read access to master"), // Level 1

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
    /**
     * Level 2: Logical Validation
     */

    // relationshipOrder must be >= 0 (already handled by nonnegative), additional context check
    if (data.relationshipOrder < 0) {
      ctx.addIssue({
        code: "custom",
        path: ["relationshipOrder"],
        message: "relationshipOrder cannot be negative",
      });
    }

    // reparentableMasterDetail logical context
    if (typeof data.reparentableMasterDetail !== "boolean") {
      ctx.addIssue({
        code: "custom",
        path: ["reparentableMasterDetail"],
        message: "reparentableMasterDetail must be a boolean",
      });
    }

    // writeRequiresMasterRead logical context
    if (typeof data.writeRequiresMasterRead !== "boolean") {
      ctx.addIssue({
        code: "custom",
        path: ["writeRequiresMasterRead"],
        message: "writeRequiresMasterRead must be a boolean",
      });
    }

    // relationshipName must be unique per object (cannot validate fully here, but we document)
  });

import { z } from "zod";

/**
 * Zod schema for Salesforce Multiselect Picklist field: picklist_multi_select__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export const MultiSelectPicklistFieldSchema = z
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
      .literal("MultiselectPicklist")
      .describe("Field type, must be exactly MultiselectPicklist"),

    required: z.boolean().describe("Whether the field is required"),

    description: z.string().optional().describe("Optional field description"),

    inlineHelpText: z
      .string()
      .optional()
      .describe("Inline help text displayed in the UI"),

    valueSet: z
      .object({
        restricted: z
          .boolean()
          .describe("If true, only allowed values are selectable"),
        sorted: z.boolean().describe("If true, values are displayed sorted"),
        values: z
          .array(
            z.object({
              fullName: z
                .string()
                .nonempty()
                .describe("Picklist value API name"),
              label: z.string().nonempty().describe("Picklist value label"),
              default: z
                .boolean()
                .describe("If true, this is the default value"),
            }),
          )
          .min(1, {
            message: "Multiselect picklist must have at least one value",
          }),
      })
      .describe("Definition of multiselect picklist values"),

    trackHistory: z.boolean().optional().describe("Track field history"),
    visibleLines: z
      .number()
      .optional()
      .describe("Number of visible lines in UI"),
  })
  .superRefine((data, ctx) => {
    // Level 2: Logical Validation

    // Only one default value allowed
    const defaultCount = data.valueSet.values.filter((v) => v.default).length;
    if (defaultCount > 1) {
      ctx.addIssue({
        code: "custom",
        path: ["valueSet", "values"],
        message: "Only one picklist value can have default = true",
      });
    }

    // Optional: Required field must have at least one selectable value
    if (data.required && data.valueSet.values.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["valueSet", "values"],
        message: "Required multiselect picklist must have at least one value",
      });
    }
  });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSelectPicklistFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Salesforce Multiselect Picklist field: picklist_multi_select__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
exports.MultiSelectPicklistFieldSchema = zod_1.z
    .object({
    fullName: zod_1.z
        .string()
        .nonempty({ message: "fullName is required" })
        .regex(/^[a-zA-Z0-9_]+__c$/, { message: "fullName must end with __c" })
        .describe("API name of the custom field"),
    label: zod_1.z
        .string()
        .nonempty({ message: "label is required" })
        .describe("Field label displayed in the UI"),
    type: zod_1.z
        .literal("MultiselectPicklist")
        .describe("Field type, must be exactly MultiselectPicklist"),
    required: zod_1.z.boolean().describe("Whether the field is required"),
    description: zod_1.z.string().optional().describe("Optional field description"),
    inlineHelpText: zod_1.z
        .string()
        .optional()
        .describe("Inline help text displayed in the UI"),
    valueSet: zod_1.z
        .object({
        restricted: zod_1.z
            .boolean()
            .describe("If true, only allowed values are selectable"),
        sorted: zod_1.z.boolean().describe("If true, values are displayed sorted"),
        values: zod_1.z
            .array(zod_1.z.object({
            fullName: zod_1.z
                .string()
                .nonempty()
                .describe("Picklist value API name"),
            label: zod_1.z.string().nonempty().describe("Picklist value label"),
            default: zod_1.z
                .boolean()
                .describe("If true, this is the default value"),
        }))
            .min(1, {
            message: "Multiselect picklist must have at least one value",
        }),
    })
        .describe("Definition of multiselect picklist values"),
    trackHistory: zod_1.z.boolean().optional().describe("Track field history"),
    visibleLines: zod_1.z
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicklistFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Salesforce Picklist field: picklist__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
exports.PicklistFieldSchema = zod_1.z
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
        .literal("Picklist")
        .describe("Field type, must be exactly Picklist"),
    required: zod_1.z.boolean().describe("Whether the field is required"),
    description: zod_1.z
        .string()
        .optional()
        .describe("Optional description of the field"),
    inlineHelpText: zod_1.z
        .string()
        .optional()
        .describe("Inline help text displayed in the UI"),
    valueSet: zod_1.z
        .object({
        restricted: zod_1.z
            .boolean()
            .describe("If true, only allowed values are selectable"),
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
            .min(1, { message: "Picklist must have at least one value" }),
    })
        .describe("Definition of picklist values"),
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
    // Optional: Check sorted order if sorted flag exists
    // if (data.valueSet.sorted) { ... }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Salesforce Time field: time__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
exports.TimeFieldSchema = zod_1.z
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
    type: zod_1.z.literal("Time").describe("Field type, must be exactly Time"),
    required: zod_1.z.boolean().describe("Whether this field is required"),
    description: zod_1.z.string().optional().describe("Optional field description"),
    inlineHelpText: zod_1.z
        .string()
        .optional()
        .describe("Inline help text displayed in the UI"),
    trackHistory: zod_1.z.boolean().optional().describe("Track field history"),
    trackTrending: zod_1.z.boolean().optional().describe("Track trending changes"),
})
    .superRefine((data, ctx) => {
    // Level 2: Logical Validation
    // Optionally, we can validate HH:MM:SS format if required
    if (data.required && !data.fullName) {
        ctx.addIssue({
            code: "custom",
            path: ["fullName"],
            message: "fullName is required for required Time fields",
        });
    }
});

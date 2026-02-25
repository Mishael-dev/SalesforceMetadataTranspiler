"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Salesforce Text field: text__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
exports.TextFieldSchema = zod_1.z
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
    type: zod_1.z.literal("Text").describe("Field type, must be exactly Text"),
    length: zod_1.z
        .number()
        .int()
        .min(1, { message: "length must be at least 1" })
        .max(255, { message: "length cannot exceed 255" })
        .describe("Maximum number of characters for the text field"),
    required: zod_1.z.boolean().describe("Whether the field is required"),
    unique: zod_1.z.boolean().describe("Whether the field is unique"),
    description: zod_1.z.string().optional().describe("Optional field description"),
    inlineHelpText: zod_1.z
        .string()
        .optional()
        .describe("Inline help text displayed in the UI"),
    externalId: zod_1.z
        .boolean()
        .optional()
        .describe("Whether the field is an external ID"),
    trackHistory: zod_1.z.boolean().optional().describe("Track field history"),
    trackTrending: zod_1.z.boolean().optional().describe("Track trending changes"),
})
    .superRefine((data, ctx) => {
    // Level 2: Logical Validation
    // unique cannot be true if externalId is true
    if (data.unique && data.externalId) {
        ctx.addIssue({
            code: "custom",
            path: ["unique"],
            message: "Text field cannot be unique if externalId is true",
        });
    }
    // Required fields must have length > 0
    if (data.required && data.length <= 0) {
        ctx.addIssue({
            code: "custom",
            path: ["length"],
            message: "Required text field must allow at least 1 character",
        });
    }
});

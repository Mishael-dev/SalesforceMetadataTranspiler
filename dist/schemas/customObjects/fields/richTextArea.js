"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextAreaFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Salesforce Rich Text Area (Html) field: text_area_rich__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
exports.RichTextAreaFieldSchema = zod_1.z
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
    type: zod_1.z.literal("Html").describe("Field type, must be exactly Html"),
    length: zod_1.z
        .number()
        .int()
        .min(1, { message: "length must be at least 1" })
        .max(32768, { message: "length cannot exceed 32768" })
        .describe("Maximum number of characters"),
    visibleLines: zod_1.z
        .number()
        .int()
        .min(1, { message: "visibleLines must be at least 1" })
        .describe("Number of visible lines in UI"),
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
    if (data.visibleLines < 1) {
        ctx.addIssue({
            code: "custom",
            path: ["visibleLines"],
            message: "visibleLines must be a positive integer",
        });
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberFieldSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schema for Salesforce Number field: number__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
exports.NumberFieldSchema = zod_1.z
    .object({
    fullName: zod_1.z
        .string()
        .nonempty({ message: "fullName is required" }) // Level 1
        .regex(/^[a-zA-Z0-9_]+__c$/, {
        message: "fullName must be a valid Salesforce API name ending with __c",
    })
        .describe("API name of the custom field, must end with __c"),
    label: zod_1.z
        .string()
        .nonempty({ message: "label is required" }) // Level 1
        .describe("Field label displayed in the UI"),
    type: zod_1.z.literal("Number").describe("Field type, must be exactly Number"), // Level 1
    precision: zod_1.z
        .number()
        .int({ message: "precision must be an integer" })
        .min(1, { message: "precision must be at least 1" }) // Level 2
        .max(18, { message: "precision cannot exceed 18" }) // Level 2
        .describe("Total number of digits allowed in the field"),
    scale: zod_1.z
        .number()
        .int({ message: "scale must be an integer" })
        .min(0, { message: "scale cannot be negative" }) // Level 2
        .describe("Number of digits to the right of the decimal point"),
    required: zod_1.z.boolean().describe("Whether the field is required"), // Level 1
    unique: zod_1.z.boolean().describe("Whether the field enforces uniqueness"), // Level 1
    isAIPredictionField: zod_1.z
        .boolean()
        .describe("Whether this number field is used for AI prediction"), // Level 1
    description: zod_1.z
        .string()
        .optional()
        .describe("Optional description of the field"),
    inlineHelpText: zod_1.z
        .string()
        .optional()
        .describe("Inline help text displayed in the UI"),
})
    .superRefine((data, ctx) => {
    /**
     * Level 2: Logical Validation
     */
    // scale cannot exceed precision
    if (data.scale > data.precision) {
        ctx.addIssue({
            code: "custom",
            path: ["scale"],
            message: "scale cannot be greater than precision",
        });
    }
    // isAIPredictionField logical check: Number field is valid
    if (typeof data.isAIPredictionField !== "boolean") {
        ctx.addIssue({
            code: "custom",
            path: ["isAIPredictionField"],
            message: "isAIPredictionField must be a boolean",
        });
    }
    // unique vs externalId check cannot fully validate here, externalId not present in this schema
});

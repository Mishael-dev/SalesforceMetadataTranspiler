"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollupSummaryFieldSchema = void 0;
const zod_1 = require("zod");
exports.RollupSummaryFieldSchema = zod_1.z
    .object({
    type: zod_1.z.literal("Summary"),
    label: zod_1.z.string().min(1).max(40),
    fullName: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9_]+__c$/, "Must be a valid Salesforce custom field API name ending in __c"),
    description: zod_1.z.string().optional(),
    inlineHelpText: zod_1.z.string().optional(),
    summarizedField: zod_1.z.string().min(1),
    summaryForeignKey: zod_1.z.string().min(1),
    summaryOperation: zod_1.z.enum(["min", "max", "sum", "avg", "count"]),
    trackHistory: zod_1.z.boolean().optional(),
    trackTrending: zod_1.z.boolean().optional(),
})
    .superRefine((data, ctx) => {
    ctx.addIssue({
        code: "custom",
        path: ["type"],
        message: "Rollup Summary fields are not yet supported in v1.", // Prevents further refinement logic from running
    });
    const sumParts = data.summarizedField.split(".");
    const fkParts = data.summaryForeignKey.split(".");
    // 1. Basic format checks
    if (sumParts.length !== 2) {
        ctx.addIssue({
            code: "custom",
            path: ["summarizedField"],
            message: "summarizedField must be in 'Object.Field' format",
        });
    }
    if (fkParts.length !== 2) {
        ctx.addIssue({
            code: "custom",
            path: ["summaryForeignKey"],
            message: "summaryForeignKey must be in 'Object.Field' format",
        });
    }
    // 2. THE CRITICAL RULE: Object names (index 0) must match
    if (sumParts[0] && fkParts[0] && sumParts[0] !== fkParts[0]) {
        ctx.addIssue({
            code: "custom",
            path: ["summaryForeignKey"],
            message: `The child object in summaryForeignKey ("${fkParts[0]}") must match the child object in summarizedField ("${sumParts[0]}")`,
        });
    }
});

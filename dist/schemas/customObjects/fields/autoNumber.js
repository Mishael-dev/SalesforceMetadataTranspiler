"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoNumberFieldSchema = void 0;
const zod_1 = require("zod");
exports.AutoNumberFieldSchema = zod_1.z.object({
    type: zod_1.z
        .literal("AutoNumber")
        .describe("The Salesforce metadata type identifier for this field."),
    label: zod_1.z
        .string()
        .describe("The user-friendly name of the field seen in the Salesforce UI."),
    fullName: zod_1.z
        .string()
        .describe("The unique API name for the field. Must end with '__c' (e.g., 'Serial_Number__c')."),
    displayFormat: zod_1.z
        .string()
        .min(3)
        .regex(/\{0+\}/, {
        message: "Display Format must contain a sequence placeholder like {0}, {00}, or {0000}.",
    })
        .refine((val) => !/[!@#$%^&*]/.test(val), "Format contains invalid special characters.")
        .describe("The pattern used to generate IDs. Use {0} for numbers and {YYYY} for years. Example: 'INV-{YYYY}-{0000}'."),
    description: zod_1.z
        .string()
        .optional()
        .describe("Internal documentation for admins explaining the purpose of this field."),
    helpText: zod_1.z
        .string()
        .optional()
        .describe("The 'i' bubble text that helps end-users understand what to do with this field."),
    startingNumber: zod_1.z
        .number()
        .default(1)
        .describe("The first number the robot stamper will use (e.g., if set to 100, the first record is 100, then 101)."),
});
//# sourceMappingURL=autoNumber.js.map
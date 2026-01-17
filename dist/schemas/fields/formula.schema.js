"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaFieldSchema = void 0;
const zod_1 = require("zod");
exports.FormulaFieldSchema = zod_1.z.object({
    type: zod_1.z.literal('Formula')
        .describe("The Salesforce metadata type identifier for this field."),
    label: zod_1.z.string()
        .describe("The user-friendly name of the formula field seen in the Salesforce UI."),
    fullName: zod_1.z.string()
        .describe("The unique API name for the field. Must end with '__c' (e.g., 'Formula_Field__c')."),
    returnType: zod_1.z.enum(['Checkbox', 'Currency', 'Date', 'DateTime', 'Number', 'Percent', 'Text', 'Time'])
        .default('Text')
        .describe("The data type returned by the formula calculation."),
    formula: zod_1.z.string()
        .describe("The actual logic of the formula. Note: Use standard Salesforce formula syntax."),
    blankOption: zod_1.z.enum(['BlankAsBlank', 'BlankAsZero'])
        .default('BlankAsZero')
        .describe("Determines how the formula engine handles empty or null fields in the calculation."),
    description: zod_1.z.string().optional()
        .describe("Internal documentation for admins explaining the logic behind this formula."),
    helpText: zod_1.z.string().optional()
        .describe("The help bubble text that explains the calculated value to end-users."),
    externalId: zod_1.z.boolean().default(false)
        .describe("Indicates whether this field can be used as a unique identifier from an external system."),
    required: zod_1.z.boolean().default(false)
        .describe("Whether this field is required (though formula fields are generally read-only)."),
    unique: zod_1.z.boolean().default(false)
        .describe("Whether the calculated value must be unique across all records."),
    trackHistory: zod_1.z.boolean().default(false)
        .describe("If true, Salesforce tracks changes to this field in the History related list."),
});
//# sourceMappingURL=formula.schema.js.map
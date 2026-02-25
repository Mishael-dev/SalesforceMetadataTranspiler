"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFieldSchema = void 0;
const zod_1 = require("zod");
exports.DateFieldSchema = zod_1.z.object({
    type: zod_1.z.literal('Date'),
    fullName: zod_1.z.string()
        .min(1, 'fullName is required')
        .regex(/^[a-zA-Z][a-zA-Z0-9_]*__c$/, 'fullName must start with a letter and end with __c'),
    label: zod_1.z.string().min(1, 'label is required'),
    // Level 2: Improved Date Formula Regex
    defaultValue: zod_1.z.string()
        .regex(/^DATE\(\d{4},\s?\d{1,2},\s?\d{1,2}\)$|^TODAY\(\)$/, {
        message: 'defaultValue must be DATE(YYYY, MM, DD) or TODAY()'
    })
        .optional(),
    required: zod_1.z.boolean().default(false),
    description: zod_1.z.string().optional(),
    inlineHelpText: zod_1.z.string().optional(),
});

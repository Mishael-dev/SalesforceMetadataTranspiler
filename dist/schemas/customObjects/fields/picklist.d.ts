import { z } from "zod";
/**
 * Zod schema for Salesforce Picklist field: picklist__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export declare const PicklistFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Picklist">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    valueSet: z.ZodObject<{
        restricted: z.ZodBoolean;
        values: z.ZodArray<z.ZodObject<{
            fullName: z.ZodString;
            label: z.ZodString;
            default: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=picklist.d.ts.map
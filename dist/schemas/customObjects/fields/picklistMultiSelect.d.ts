import { z } from "zod";
/**
 * Zod schema for Salesforce Multiselect Picklist field: picklist_multi_select__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export declare const MultiSelectPicklistFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"MultiselectPicklist">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    valueSet: z.ZodObject<{
        restricted: z.ZodBoolean;
        sorted: z.ZodBoolean;
        values: z.ZodArray<z.ZodObject<{
            fullName: z.ZodString;
            label: z.ZodString;
            default: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    visibleLines: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=picklistMultiSelect.d.ts.map
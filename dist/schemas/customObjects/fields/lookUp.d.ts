import { z } from "zod";
/**
 * Zod schema for Salesforce Lookup field: Lookup_Field__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation (cross-field dependencies)
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export declare const LookupFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Lookup">;
    referenceTo: z.ZodString;
    relationshipName: z.ZodString;
    relationshipLabel: z.ZodString;
    deleteConstraint: z.ZodEnum<{
        SetNull: "SetNull";
        Restrict: "Restrict";
    }>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=lookUp.d.ts.map
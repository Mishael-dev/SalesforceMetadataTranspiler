import { z } from "zod";
/**
 * Zod schema for Salesforce Master-Detail field: master_detail__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export declare const MasterDetailFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"MasterDetail">;
    referenceTo: z.ZodString;
    relationshipLabel: z.ZodString;
    relationshipName: z.ZodString;
    relationshipOrder: z.ZodNumber;
    reparentableMasterDetail: z.ZodBoolean;
    writeRequiresMasterRead: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=masterDetail.d.ts.map
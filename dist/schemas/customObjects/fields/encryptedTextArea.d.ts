import { z } from "zod";
/**
 * Zod schema for Salesforce Encrypted Text Area field: text_area_encrypted__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 (platform constraints, pre-flight checks) are not enforced here.
 */
export declare const EncryptedTextFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"EncryptedText">;
    required: z.ZodBoolean;
    length: z.ZodNumber;
    maskChar: z.ZodEnum<{
        asterisk: "asterisk";
        numberSign: "numberSign";
    }>;
    maskType: z.ZodEnum<{
        ssn: "ssn";
        creditCard: "creditCard";
        password: "password";
    }>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=encryptedTextArea.d.ts.map
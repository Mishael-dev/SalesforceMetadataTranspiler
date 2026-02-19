import { z } from 'zod';
/**
 * Zod schema for Salesforce Location (Geolocation) field: geolocation__c
 *
 * Level 1: Structural Validation
 * Level 2: Logical Validation
 * Level 3 & 4 validations are not handled here (platform constraints, pre-flight checks)
 */
export declare const GeoLocationFieldSchema: z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Location">;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
    displayLocationInDecimal: z.ZodBoolean;
    scale: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=geoLocation.d.ts.map
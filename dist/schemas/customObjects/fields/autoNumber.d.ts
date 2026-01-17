import { z } from "zod";
export declare const AutoNumberFieldSchema: z.ZodObject<{
    type: z.ZodLiteral<"AutoNumber">;
    label: z.ZodString;
    fullName: z.ZodString;
    displayFormat: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    helpText: z.ZodOptional<z.ZodString>;
    startingNumber: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;

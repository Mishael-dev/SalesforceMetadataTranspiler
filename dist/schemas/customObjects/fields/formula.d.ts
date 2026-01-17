import { z } from "zod";
export declare const FormulaFieldSchema: z.ZodObject<{
    type: z.ZodLiteral<"Formula">;
    label: z.ZodString;
    fullName: z.ZodString;
    returnType: z.ZodDefault<z.ZodEnum<{
        Checkbox: "Checkbox";
        Currency: "Currency";
        Date: "Date";
        DateTime: "DateTime";
        Number: "Number";
        Percent: "Percent";
        Text: "Text";
        Time: "Time";
    }>>;
    formula: z.ZodString;
    blankOption: z.ZodDefault<z.ZodEnum<{
        BlankAsBlank: "BlankAsBlank";
        BlankAsZero: "BlankAsZero";
    }>>;
    description: z.ZodOptional<z.ZodString>;
    helpText: z.ZodOptional<z.ZodString>;
    externalId: z.ZodDefault<z.ZodBoolean>;
    required: z.ZodDefault<z.ZodBoolean>;
    unique: z.ZodDefault<z.ZodBoolean>;
    trackHistory: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;

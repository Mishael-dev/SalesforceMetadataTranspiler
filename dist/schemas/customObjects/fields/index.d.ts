import { z } from "zod";
export declare const FieldSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"AutoNumber">;
    label: z.ZodString;
    fullName: z.ZodString;
    displayFormat: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    helpText: z.ZodOptional<z.ZodString>;
    startingNumber: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>, z.ZodObject<{
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
}, z.core.$strip>], "type">;

import z from "zod";
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
export declare const CustomObjectWithFieldsSchema: z.ZodObject<{
    label: z.ZodString;
    pluralLabel: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    nameField: z.ZodObject<{
        label: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<{
            AutoNumber: "AutoNumber";
            Text: "Text";
        }>>;
        trackHistory: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    deploymentStatus: z.ZodDefault<z.ZodEnum<{
        InDevelopment: "InDevelopment";
        Deployed: "Deployed";
    }>>;
    allowInChatterGroups: z.ZodDefault<z.ZodBoolean>;
    enableActivities: z.ZodDefault<z.ZodBoolean>;
    enableBulkApi: z.ZodDefault<z.ZodBoolean>;
    enableFeeds: z.ZodDefault<z.ZodBoolean>;
    enableHistory: z.ZodDefault<z.ZodBoolean>;
    enableLicensing: z.ZodDefault<z.ZodBoolean>;
    enableReports: z.ZodDefault<z.ZodBoolean>;
    enableSearch: z.ZodDefault<z.ZodBoolean>;
    enableSharing: z.ZodDefault<z.ZodBoolean>;
    enableStreamingApi: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodDefault<z.ZodString>;
    fields: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strip>], "type">>;
}, z.core.$strip>;
export declare const RootSchema: z.ZodArray<z.ZodObject<{
    label: z.ZodString;
    pluralLabel: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    nameField: z.ZodObject<{
        label: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<{
            AutoNumber: "AutoNumber";
            Text: "Text";
        }>>;
        trackHistory: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    deploymentStatus: z.ZodDefault<z.ZodEnum<{
        InDevelopment: "InDevelopment";
        Deployed: "Deployed";
    }>>;
    allowInChatterGroups: z.ZodDefault<z.ZodBoolean>;
    enableActivities: z.ZodDefault<z.ZodBoolean>;
    enableBulkApi: z.ZodDefault<z.ZodBoolean>;
    enableFeeds: z.ZodDefault<z.ZodBoolean>;
    enableHistory: z.ZodDefault<z.ZodBoolean>;
    enableLicensing: z.ZodDefault<z.ZodBoolean>;
    enableReports: z.ZodDefault<z.ZodBoolean>;
    enableSearch: z.ZodDefault<z.ZodBoolean>;
    enableSharing: z.ZodDefault<z.ZodBoolean>;
    enableStreamingApi: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodDefault<z.ZodString>;
    fields: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    }, z.core.$strip>], "type">>;
}, z.core.$strip>>;

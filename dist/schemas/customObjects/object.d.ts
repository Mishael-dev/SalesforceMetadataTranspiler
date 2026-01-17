import { z } from "zod";
export declare const ObjectSchema: z.ZodObject<{
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
}, z.core.$strip>;

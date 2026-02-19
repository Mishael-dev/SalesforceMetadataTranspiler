import { z } from "zod";
export declare const FieldSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"AutoNumber">;
    label: z.ZodString;
    fullName: z.ZodString;
    displayFormat: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    startingNumber: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodDefault<z.ZodBoolean>;
    trackHistory: z.ZodDefault<z.ZodBoolean>;
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
    inlineHelpText: z.ZodOptional<z.ZodString>;
    externalId: z.ZodDefault<z.ZodBoolean>;
    required: z.ZodDefault<z.ZodBoolean>;
    unique: z.ZodDefault<z.ZodBoolean>;
    trackHistory: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"Checkbox">;
    fullName: z.ZodString;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    defaultValue: z.ZodBoolean;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"Currency">;
    fullName: z.ZodString;
    label: z.ZodString;
    defaultValue: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    precision: z.ZodNumber;
    scale: z.ZodNumber;
    required: z.ZodBoolean;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"Date">;
    fullName: z.ZodString;
    label: z.ZodString;
    defaultValue: z.ZodOptional<z.ZodString>;
    required: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"DateTime">;
    defaultValue: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Email">;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
    caseSensitive: z.ZodBoolean;
    unique: z.ZodBoolean;
    externalId: z.ZodBoolean;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Location">;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
    displayLocationInDecimal: z.ZodBoolean;
    scale: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Number">;
    precision: z.ZodNumber;
    scale: z.ZodNumber;
    required: z.ZodBoolean;
    unique: z.ZodBoolean;
    isAIPredictionField: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Percent">;
    precision: z.ZodNumber;
    scale: z.ZodNumber;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Phone">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Picklist">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    valueSet: z.ZodObject<{
        restricted: z.ZodBoolean;
        values: z.ZodArray<z.ZodObject<{
            fullName: z.ZodString;
            label: z.ZodString;
            default: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Text">;
    length: z.ZodNumber;
    required: z.ZodBoolean;
    unique: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    externalId: z.ZodOptional<z.ZodBoolean>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"TextArea">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"LongTextArea">;
    length: z.ZodNumber;
    visibleLines: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Html">;
    length: z.ZodNumber;
    visibleLines: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Time">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    fullName: z.ZodString;
    label: z.ZodString;
    type: z.ZodLiteral<"Url">;
    required: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"Summary">;
    label: z.ZodString;
    fullName: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    summarizedField: z.ZodString;
    summaryForeignKey: z.ZodString;
    summaryOperation: z.ZodEnum<{
        min: "min";
        max: "max";
        sum: "sum";
        avg: "avg";
        count: "count";
    }>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>], "type">;
//# sourceMappingURL=index.d.ts.map
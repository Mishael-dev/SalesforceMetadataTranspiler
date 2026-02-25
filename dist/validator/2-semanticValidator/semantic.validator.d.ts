import { MetadataValidator } from "./types";
import { ValidationError } from "../../types/validationResult";
export declare class SemanticValidator {
    private validators;
    registerValidator(validator: MetadataValidator): void;
    validate(schema: unknown): {
        success: false;
        errors: ValidationError[];
        normalizedData?: undefined;
    } | {
        success: true;
        errors: never[];
        normalizedData: {
            fullName: string;
            label: string;
            pluralLabel: string;
            nameField: {
                label: string;
                type: "AutoNumber" | "Text";
                trackHistory: boolean;
            };
            deploymentStatus: "InDevelopment" | "Deployed";
            allowInChatterGroups: boolean;
            enableActivities: boolean;
            enableBulkApi: boolean;
            enableFeeds: boolean;
            enableHistory: boolean;
            enableLicensing: boolean;
            enableReports: boolean;
            enableSearch: boolean;
            enableSharing: boolean;
            enableStreamingApi: boolean;
            visibility: string;
            sharingModel: "Read" | "ReadWrite" | "Private" | "ControlledByParent";
            externalSharingModel: "Read" | "ReadWrite" | "Private" | "ControlledByParent";
            fields: ({
                type: "AutoNumber";
                label: string;
                fullName: string;
                displayFormat: string;
                externalId: boolean;
                trackHistory: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                startingNumber?: number | undefined;
            } | {
                type: "Formula";
                label: string;
                fullName: string;
                returnType: "Checkbox" | "Currency" | "Date" | "DateTime" | "Number" | "Percent" | "Text" | "Time";
                formula: string;
                blankOption: "BlankAsBlank" | "BlankAsZero";
                externalId: boolean;
                required: boolean;
                unique: boolean;
                trackHistory: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                type: "Checkbox";
                fullName: string;
                label: string;
                defaultValue: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                type: "Currency";
                fullName: string;
                label: string;
                precision: number;
                scale: number;
                required: boolean;
                defaultValue?: number | undefined;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "DateTime";
                required: boolean;
                defaultValue?: string | undefined;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Email";
                required: boolean;
                caseSensitive: boolean;
                unique: boolean;
                externalId: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Lookup";
                referenceTo: string;
                relationshipName: string;
                relationshipLabel: string;
                deleteConstraint: "SetNull" | "Restrict";
                required: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "MasterDetail";
                referenceTo: string;
                relationshipLabel: string;
                relationshipName: string;
                relationshipOrder: number;
                reparentableMasterDetail: boolean;
                writeRequiresMasterRead: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Number";
                precision: number;
                scale: number;
                required: boolean;
                unique: boolean;
                isAIPredictionField: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Percent";
                precision: number;
                scale: number;
                required: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Phone";
                required: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Picklist";
                required: boolean;
                valueSet: {
                    restricted: boolean;
                    values: {
                        fullName: string;
                        label: string;
                        default: boolean;
                    }[];
                };
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "MultiselectPicklist";
                required: boolean;
                valueSet: {
                    restricted: boolean;
                    sorted: boolean;
                    values: {
                        fullName: string;
                        label: string;
                        default: boolean;
                    }[];
                };
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                visibleLines?: number | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Text";
                length: number;
                required: boolean;
                unique: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                externalId?: boolean | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                fullName: string;
                label: string;
                type: "EncryptedText";
                required: boolean;
                length: number;
                maskChar: "asterisk" | "numberSign";
                maskType: "ssn" | "creditCard" | "password";
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                fullName: string;
                label: string;
                type: "LongTextArea";
                length: number;
                visibleLines: number;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Html";
                length: number;
                visibleLines: number;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Time";
                required: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Url";
                required: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                type: "Summary";
                label: string;
                fullName: string;
                summarizedField: string;
                summaryForeignKey: string;
                summaryOperation: "min" | "max" | "sum" | "avg" | "count";
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            } | {
                type: "Date";
                fullName: string;
                label: string;
                required: boolean;
                defaultValue?: string | undefined;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "Location";
                required: boolean;
                displayLocationInDecimal: boolean;
                scale: number;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
            } | {
                fullName: string;
                label: string;
                type: "TextArea";
                required: boolean;
                description?: string | undefined;
                inlineHelpText?: string | undefined;
                trackHistory?: boolean | undefined;
                trackTrending?: boolean | undefined;
            })[];
            type: "CustomObject";
            description?: string | undefined;
        }[];
    };
}
//# sourceMappingURL=semantic.validator.d.ts.map
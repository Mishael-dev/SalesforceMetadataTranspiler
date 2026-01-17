export type ValidationLevel = 1 | 2 | 3 | 4;
export interface ValidationError {
    level: ValidationLevel;
    message: string;
    path?: unknown;
}
export type ValidationResult<T = unknown> = {
    success: true;
    errors: [];
    normalizedData?: T;
} | {
    success: false;
    errors: ValidationError[];
    normalizedData?: never;
};
export declare class StructuralValidator {
    constructor();
    validate(schema: unknown): {
        success: false;
        errors: ValidationError[];
        normalizedData?: undefined;
    } | {
        success: true;
        errors: never[];
        normalizedData: {
            type: "CustomObject";
            metaData: {
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
                fields: ({
                    type: "AutoNumber";
                    label: string;
                    fullName: string;
                    displayFormat: string;
                    startingNumber: number;
                    description?: string | undefined;
                    helpText?: string | undefined;
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
                    helpText?: string | undefined;
                })[];
                description?: string | undefined;
            }[];
        } | {
            type: "PermissionSet";
            metaData: any[];
        } | {
            type: "Tab";
            metaData: any[];
        };
    };
}

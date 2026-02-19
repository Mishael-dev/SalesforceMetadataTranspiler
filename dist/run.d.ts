export declare const transpilerConfig: {
    apiVersion: string;
    outputDirectory: string;
    validateOnly: boolean;
};
export declare const schema: readonly [{
    readonly type: "CustomObject";
    readonly fullName: "mishael__c";
    readonly label: "Device";
    readonly pluralLabel: "Devices";
    readonly description: "Represents hardware devices assigned to employees or departments.";
    readonly deploymentStatus: "Deployed";
    readonly allowInChatterGroups: true;
    readonly nameField: {
        readonly label: "Device Name";
        readonly type: "Text";
        readonly trackHistory: false;
    };
    readonly enableActivities: true;
    readonly enableBulkApi: true;
    readonly enableFeeds: false;
    readonly enableHistory: true;
    readonly enableLicensing: false;
    readonly enableReports: true;
    readonly enableSearch: true;
    readonly enableSharing: true;
    readonly enableStreamingApi: true;
    readonly visibility: "Public";
    readonly fields: readonly [{
        readonly type: "AutoNumber";
        readonly label: "Device Serial Number";
        readonly fullName: "Device_Serial__c";
        readonly displayFormat: "DEV-{000000}";
        readonly description: "System-generated serial number for internal tracking.";
        readonly inlineHelpText: "Internal serial number. Example: DEV-000123";
        readonly startingNumber: 1;
    }, {
        readonly type: "Formula";
        readonly label: "Device Warranty Check";
        readonly fullName: "Warranty_Check__c";
        readonly returnType: "Text";
        readonly formula: "IF(CONTAINS(Name, \"Refurbished\"), \"Limited Warranty\", \"Full Warranty\")";
        readonly blankOption: "BlankAsBlank";
        readonly description: "Determines warranty status based on the device name.";
        readonly inlineHelpText: "Automatically flags warranty type based on whether the name contains 'Refurbished'.";
        readonly externalId: false;
        readonly required: false;
        readonly unique: false;
        readonly trackHistory: false;
    }, {
        readonly type: "Checkbox";
        readonly label: "Active";
        readonly fullName: "Active__c";
        readonly defaultValue: true;
        readonly description: "Indicates if the record is active";
        readonly inlineHelpText: "Check this box if the record is currently active";
        readonly trackHistory: false;
        readonly required: false;
        readonly externalId: false;
    }, {
        readonly type: "Currency";
        readonly fullName: "currency__c";
        readonly label: "currency";
        readonly defaultValue: 1234.56;
        readonly description: "This field stores the transaction currency";
        readonly inlineHelpText: "Enter the currency amount";
        readonly precision: 14;
        readonly scale: 4;
        readonly required: true;
    }, {
        readonly fullName: "date__c";
        readonly label: "Date";
        readonly type: "Date";
        readonly defaultValue: "DATE(2026,1,19)";
        readonly description: "This is the main date field for records";
        readonly inlineHelpText: "Select the relevant date";
        readonly required: true;
    }, {
        readonly fullName: "date_time__c";
        readonly label: "Date Time";
        readonly type: "DateTime";
        readonly defaultValue: "NOW()";
        readonly description: "This field stores the date and time of the event";
        readonly inlineHelpText: "Enter the date and time";
        readonly required: false;
    }, {
        readonly fullName: "email__c";
        readonly label: "Email";
        readonly type: "Email";
        readonly description: "Primary email address of the contact";
        readonly inlineHelpText: "Enter a valid email address";
        readonly required: true;
        readonly caseSensitive: true;
        readonly unique: true;
        readonly externalId: false;
    }, {
        readonly fullName: "geolocation__c";
        readonly label: "Geolocation";
        readonly type: "Location";
        readonly description: "Stores the geolocation coordinates";
        readonly inlineHelpText: "Enter latitude and longitude";
        readonly required: false;
        readonly displayLocationInDecimal: true;
        readonly scale: 6;
    }, {
        readonly fullName: "number__c";
        readonly label: "Number Field";
        readonly type: "Number";
        readonly precision: 14;
        readonly scale: 2;
        readonly required: false;
        readonly unique: false;
        readonly isAIPredictionField: true;
        readonly description: "number description";
        readonly inlineHelpText: "number help";
    }, {
        readonly fullName: "percent__c";
        readonly label: "Percent Field";
        readonly type: "Percent";
        readonly precision: 14;
        readonly scale: 2;
        readonly required: false;
        readonly description: "percent description";
        readonly inlineHelpText: "percent help";
    }, {
        readonly fullName: "phone__c";
        readonly label: "Phone";
        readonly type: "Phone";
        readonly required: false;
        readonly description: "Phone number of the contact";
        readonly inlineHelpText: "+1 (555) 123-4567";
    }, {
        readonly fullName: "picklist__c";
        readonly label: "Picklist Field";
        readonly type: "Picklist";
        readonly required: false;
        readonly description: "picklist description";
        readonly inlineHelpText: "picklist help text";
        readonly valueSet: {
            readonly restricted: true;
            readonly values: readonly [{
                readonly fullName: "value 1";
                readonly label: "value 1";
                readonly default: false;
            }, {
                readonly fullName: "value 2";
                readonly label: "value 2";
                readonly default: false;
            }, {
                readonly fullName: "value 3";
                readonly label: "value 3";
                readonly default: false;
            }];
        };
    }, {
        readonly fullName: "picklist_multi_select__c";
        readonly label: "Multiselect Picklist";
        readonly type: "MultiselectPicklist";
        readonly required: false;
        readonly description: "picklist description";
        readonly inlineHelpText: "picklist help text";
        readonly valueSet: {
            readonly restricted: true;
            readonly sorted: false;
            readonly values: readonly [{
                readonly fullName: "value 1";
                readonly label: "value 1";
                readonly default: false;
            }, {
                readonly fullName: "value 2";
                readonly label: "value 2";
                readonly default: false;
            }, {
                readonly fullName: "value 3";
                readonly label: "value 3";
                readonly default: false;
            }];
        };
        readonly trackHistory: false;
        readonly visibleLines: 4;
    }, {
        readonly fullName: "text__c";
        readonly label: "Text Field";
        readonly type: "Text";
        readonly length: 20;
        readonly required: false;
        readonly unique: false;
        readonly description: "text description";
        readonly inlineHelpText: "text help text";
        readonly externalId: false;
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "text_area__c";
        readonly label: "Text Area Field";
        readonly type: "TextArea";
        readonly required: false;
        readonly description: "text area description";
        readonly inlineHelpText: "text area help";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "text_area_encrypted__c";
        readonly label: "Encrypted Text Area";
        readonly type: "EncryptedText";
        readonly required: false;
        readonly length: 12;
        readonly maskChar: "asterisk";
        readonly maskType: "ssn";
        readonly description: "text area encrypted description";
        readonly inlineHelpText: "text area encrypted help";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "text_area_long__c";
        readonly label: "Long Text Area";
        readonly type: "LongTextArea";
        readonly length: 32768;
        readonly visibleLines: 3;
        readonly description: "text area long description";
        readonly inlineHelpText: "text area long help text";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "text_area_rich__c";
        readonly label: "Rich Text Area";
        readonly type: "Html";
        readonly length: 32768;
        readonly visibleLines: 25;
        readonly description: "text area rich description";
        readonly inlineHelpText: "text area rich help";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "time__c";
        readonly label: "Time Field";
        readonly type: "Time";
        readonly required: false;
        readonly description: "time description";
        readonly inlineHelpText: "time help text";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "url__c";
        readonly label: "Website URL";
        readonly type: "Url";
        readonly required: false;
        readonly description: "url description";
        readonly inlineHelpText: "Please enter a valid URL starting with http:// or https://";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }];
}];
//# sourceMappingURL=run.d.ts.map
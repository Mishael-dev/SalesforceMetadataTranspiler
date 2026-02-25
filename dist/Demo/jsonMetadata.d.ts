export declare const jsonMetadata: readonly [{
    readonly type: "CustomObject";
    readonly fullName: "Product_Catalog__c";
    readonly label: "Product Catalog";
    readonly pluralLabel: "Product Catalogs";
    readonly description: "Catalog of products available for sale";
    readonly deploymentStatus: "Deployed";
    readonly allowInChatterGroups: true;
    readonly nameField: {
        readonly label: "Product Name";
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
    readonly sharingModel: "ReadWrite";
    readonly externalSharingModel: "ReadWrite";
    readonly enableStreamingApi: true;
    readonly visibility: "Public";
    readonly fields: readonly [{
        readonly type: "AutoNumber";
        readonly label: "Product SKU";
        readonly fullName: "Product_SKU__c";
        readonly displayFormat: "SKU-{0000}";
        readonly description: "System-generated product SKU for tracking";
        readonly inlineHelpText: "Unique product identifier. Example: SKU-0001";
        readonly startingNumber: 1000;
    }, {
        readonly type: "Checkbox";
        readonly label: "Is Active";
        readonly fullName: "Is_Active__c";
        readonly defaultValue: true;
        readonly description: "Indicates if the product is currently active";
        readonly inlineHelpText: "Check this box if the product is available for sale";
        readonly trackHistory: false;
        readonly required: false;
        readonly externalId: false;
    }, {
        readonly type: "Currency";
        readonly fullName: "Unit_Price__c";
        readonly label: "Unit Price";
        readonly defaultValue: 0;
        readonly description: "Price per unit of the product";
        readonly inlineHelpText: "Enter the unit price in USD";
        readonly precision: 18;
        readonly scale: 2;
        readonly required: true;
    }, {
        readonly fullName: "Launch_Date__c";
        readonly label: "Launch Date";
        readonly type: "Date";
        readonly defaultValue: "DATE(2026,1,19)";
        readonly description: "Date when the product was launched";
        readonly inlineHelpText: "Select the product launch date";
        readonly required: false;
    }, {
        readonly fullName: "Last_Updated__c";
        readonly label: "Last Updated";
        readonly type: "DateTime";
        readonly defaultValue: "NOW()";
        readonly description: "Date and time of last update";
        readonly inlineHelpText: "Automatically set to current date/time";
        readonly required: false;
    }, {
        readonly fullName: "Supplier_Email__c";
        readonly label: "Supplier Email";
        readonly type: "Email";
        readonly description: "Primary email address of the supplier";
        readonly inlineHelpText: "Enter a valid email address";
        readonly required: false;
        readonly caseSensitive: false;
        readonly unique: false;
        readonly externalId: false;
    }, {
        readonly fullName: "Warehouse_Location__c";
        readonly label: "Warehouse Location";
        readonly type: "Location";
        readonly description: "Geographic coordinates of the warehouse";
        readonly inlineHelpText: "Enter latitude and longitude";
        readonly required: false;
        readonly displayLocationInDecimal: true;
        readonly scale: 5;
    }, {
        readonly fullName: "Stock_Quantity__c";
        readonly label: "Stock Quantity";
        readonly type: "Number";
        readonly precision: 10;
        readonly scale: 0;
        readonly required: true;
        readonly unique: false;
        readonly isAIPredictionField: false;
        readonly description: "Current quantity in stock";
        readonly inlineHelpText: "Enter the number of units available";
    }, {
        readonly fullName: "Discount_Rate__c";
        readonly label: "Discount Rate";
        readonly type: "Percent";
        readonly precision: 5;
        readonly scale: 2;
        readonly required: false;
        readonly description: "Discount percentage applied to unit price";
        readonly inlineHelpText: "Enter discount as a percentage";
    }, {
        readonly fullName: "Supplier_Phone__c";
        readonly label: "Supplier Phone";
        readonly type: "Phone";
        readonly required: false;
        readonly description: "Phone number of the supplier";
        readonly inlineHelpText: "+1 (555) 123-4567";
    }, {
        readonly fullName: "Product_Category__c";
        readonly label: "Product Category";
        readonly type: "Picklist";
        readonly required: true;
        readonly description: "Primary category of the product";
        readonly inlineHelpText: "Select the appropriate product category";
        readonly valueSet: {
            readonly restricted: true;
            readonly values: readonly [{
                readonly fullName: "Electronics";
                readonly label: "Electronics";
                readonly default: true;
            }, {
                readonly fullName: "Clothing";
                readonly label: "Clothing";
                readonly default: false;
            }, {
                readonly fullName: "Home_Goods";
                readonly label: "Home Goods";
                readonly default: false;
            }, {
                readonly fullName: "Sports";
                readonly label: "Sports & Outdoors";
                readonly default: false;
            }];
        };
    }, {
        readonly fullName: "Product_Tags__c";
        readonly label: "Product Tags";
        readonly type: "MultiselectPicklist";
        readonly required: false;
        readonly description: "Multiple tags for product categorization";
        readonly inlineHelpText: "Select one or more applicable tags";
        readonly valueSet: {
            readonly restricted: true;
            readonly sorted: false;
            readonly values: readonly [{
                readonly fullName: "New_Arrival";
                readonly label: "New Arrival";
                readonly default: false;
            }, {
                readonly fullName: "Best_Seller";
                readonly label: "Best Seller";
                readonly default: false;
            }, {
                readonly fullName: "On_Sale";
                readonly label: "On Sale";
                readonly default: false;
            }, {
                readonly fullName: "Limited_Edition";
                readonly label: "Limited Edition";
                readonly default: false;
            }];
        };
        readonly trackHistory: false;
        readonly visibleLines: 4;
    }, {
        readonly fullName: "Product_Code__c";
        readonly label: "Product Code";
        readonly type: "Text";
        readonly length: 50;
        readonly required: false;
        readonly unique: false;
        readonly description: "Unique external product code";
        readonly inlineHelpText: "Enter the manufacturer's product code";
        readonly externalId: true;
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "Short_Description__c";
        readonly label: "Short Description";
        readonly type: "TextArea";
        readonly required: false;
        readonly description: "Brief product description";
        readonly inlineHelpText: "Enter a short product summary";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "Encrypted_Serial_Number__c";
        readonly label: "Encrypted Serial Number";
        readonly type: "EncryptedText";
        readonly required: false;
        readonly length: 175;
        readonly maskChar: "asterisk";
        readonly maskType: "ssn";
        readonly description: "Encrypted product serial number";
        readonly inlineHelpText: "Secure serial number storage";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "Full_Description__c";
        readonly label: "Full Description";
        readonly type: "LongTextArea";
        readonly length: 32768;
        readonly visibleLines: 5;
        readonly description: "Detailed product description";
        readonly inlineHelpText: "Enter comprehensive product details";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "Marketing_Content__c";
        readonly label: "Marketing Content";
        readonly type: "Html";
        readonly length: 32768;
        readonly visibleLines: 25;
        readonly description: "Rich text marketing content";
        readonly inlineHelpText: "Enter formatted marketing copy";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "Preferred_Delivery_Time__c";
        readonly label: "Preferred Delivery Time";
        readonly type: "Time";
        readonly required: false;
        readonly description: "Preferred time for delivery";
        readonly inlineHelpText: "Select delivery time window";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "Product_Website__c";
        readonly label: "Product Website";
        readonly type: "Url";
        readonly required: false;
        readonly description: "Product information website";
        readonly inlineHelpText: "Enter URL starting with http:// or https://";
        readonly trackHistory: false;
        readonly trackTrending: false;
    }, {
        readonly fullName: "Account_Lookup__c";
        readonly label: "Account";
        readonly type: "Lookup";
        readonly referenceTo: "Another_Product_Catalog__c";
        readonly relationshipName: "Account";
        readonly relationshipLabel: "Accounts";
        readonly deleteConstraint: "Restrict";
        readonly description: "Lookup to Account object";
        readonly inlineHelpText: "Select the related Account record";
        readonly required: true;
    }];
}, {
    readonly type: "CustomObject";
    readonly fullName: "Another_Product_Catalog__c";
    readonly label: "Product Catalog";
    readonly pluralLabel: "Product Catalogs";
    readonly description: "Catalog of products available for sale";
    readonly deploymentStatus: "Deployed";
    readonly allowInChatterGroups: true;
    readonly nameField: {
        readonly label: "Product Name";
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
    readonly sharingModel: "ReadWrite";
    readonly externalSharingModel: "ReadWrite";
    readonly enableStreamingApi: true;
    readonly visibility: "Public";
    readonly fields: readonly [{
        readonly type: "AutoNumber";
        readonly label: "Product SKU";
        readonly fullName: "Product_SKU__c";
        readonly displayFormat: "SKU-{0000}";
        readonly description: "System-generated product SKU for tracking";
        readonly inlineHelpText: "Unique product identifier. Example: SKU-0001";
        readonly startingNumber: 1000;
    }, {
        readonly type: "Checkbox";
        readonly label: "Is Active";
        readonly fullName: "Is_Active__c";
        readonly defaultValue: true;
        readonly description: "Indicates if the product is currently active";
        readonly inlineHelpText: "Check this box if the product is available for sale";
        readonly trackHistory: false;
        readonly required: false;
        readonly externalId: false;
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
    }, {
        readonly fullName: "Lookup_Field__c";
        readonly label: "Kitchen Sink Reference";
        readonly type: "Lookup";
        readonly referenceTo: "Account";
        readonly relationshipName: "Kitchen_Sinks";
        readonly relationshipLabel: "Kitchen Sinks";
        readonly deleteConstraint: "SetNull";
        readonly description: "This is the description for the lookup field";
        readonly inlineHelpText: "This is the help text for the lookup field";
        readonly required: false;
    }, {
        readonly fullName: "master_detail__c";
        readonly label: "Master Detail";
        readonly type: "MasterDetail";
        readonly referenceTo: "Another_Product_Catalog__c";
        readonly relationshipLabel: "Kitchen Sinks";
        readonly relationshipName: "Kitchen_Sinks";
        readonly relationshipOrder: 0;
        readonly reparentableMasterDetail: true;
        readonly writeRequiresMasterRead: false;
        readonly description: "master detail description";
        readonly inlineHelpText: "master-detail-help-text";
    }];
}];
//# sourceMappingURL=jsonMetadata.d.ts.map
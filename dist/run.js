import { SalesforceMetadataTranspiler } from "./salesforceMetadataTranspiler";
import { PackageBuilder } from "./packageBuilder/PackageBuilder";
export const transpilerConfig = {
    apiVersion: "v65.0", // Required Salesforce API version
    outputDirectory: "./output", // Optional, default './output'
    validateOnly: true, // Optional, default false
};
export const schema = [
    {
        type: "CustomObject",
        fullName: "mishael__c",
        label: "Device",
        pluralLabel: "Devices",
        description: "Represents hardware devices assigned to employees or departments.",
        deploymentStatus: "Deployed",
        allowInChatterGroups: true,
        nameField: {
            label: "Device Name",
            type: "Text",
            trackHistory: false,
        },
        enableActivities: true,
        enableBulkApi: true,
        enableFeeds: false,
        enableHistory: true,
        enableLicensing: false,
        enableReports: true,
        enableSearch: true,
        enableSharing: true,
        enableStreamingApi: true,
        visibility: "Public",
        fields: [
            {
                type: "AutoNumber",
                label: "Device Serial Number",
                fullName: "Device_Serial__c",
                displayFormat: "DEV-{000000}",
                description: "System-generated serial number for internal tracking.",
                inlineHelpText: "Internal serial number. Example: DEV-000123",
                startingNumber: 1,
            },
            {
                type: "Formula",
                label: "Device Warranty Check",
                fullName: "Warranty_Check__c",
                returnType: "Text",
                formula: 'IF(CONTAINS(Name, "Refurbished"), "Limited Warranty", "Full Warranty")',
                blankOption: "BlankAsBlank",
                description: "Determines warranty status based on the device name.",
                inlineHelpText: "Automatically flags warranty type based on whether the name contains 'Refurbished'.",
                externalId: false,
                required: false,
                unique: false,
                trackHistory: false,
            },
            {
                type: "Checkbox",
                label: "Active",
                fullName: "Active__c",
                defaultValue: true,
                description: "Indicates if the record is active",
                inlineHelpText: "Check this box if the record is currently active",
                trackHistory: false,
                required: false,
                externalId: false,
            },
            {
                type: "Currency",
                fullName: "currency__c",
                label: "currency",
                defaultValue: 1234.56,
                description: "This field stores the transaction currency",
                inlineHelpText: "Enter the currency amount",
                precision: 14,
                scale: 4,
                required: true,
            },
            {
                fullName: "date__c",
                label: "Date",
                type: "Date",
                defaultValue: "DATE(2026,1,19)",
                description: "This is the main date field for records",
                inlineHelpText: "Select the relevant date",
                required: true,
            },
            {
                fullName: "date_time__c",
                label: "Date Time",
                type: "DateTime",
                defaultValue: "NOW()",
                description: "This field stores the date and time of the event",
                inlineHelpText: "Enter the date and time",
                required: false,
            },
            {
                fullName: "email__c",
                label: "Email",
                type: "Email",
                description: "Primary email address of the contact",
                inlineHelpText: "Enter a valid email address",
                required: true,
                caseSensitive: true,
                unique: true,
                externalId: false,
            },
            {
                fullName: "geolocation__c",
                label: "Geolocation",
                type: "Location",
                description: "Stores the geolocation coordinates",
                inlineHelpText: "Enter latitude and longitude",
                required: false,
                displayLocationInDecimal: true,
                scale: 6,
            },
            // {
            //   fullName: "Lookup_Field__c",
            //   label: "Kitchen Sink Reference",
            //   type: "Lookup",
            //   referenceTo: "Acco",
            //   relationshipName: "Kitchen_Sinks",
            //   relationshipLabel: "Kitchen Sinks",
            //   deleteConstraint: "SetNull",
            //   description: "This is the description for the lookup field",
            //   inlineHelpText: "This is the help text for the lookup field",
            //   required: false,
            // },
            // {
            //   fullName: "master_detail__c",
            //   label: "Master Detail",
            //   type: "MasterDetail",
            //   referenceTo: "Account",
            //   relationshipLabel: "Kitchen Sinks",
            //   relationshipName: "Kitchen_Sinks",
            //   relationshipOrder: 0,
            //   reparentableMasterDetail: true,
            //   writeRequiresMasterRead: false,
            //   description: "master detail description",
            //   inlineHelpText: "master-detail-help-text",
            // },
            {
                fullName: "number__c",
                label: "Number Field",
                type: "Number",
                precision: 14,
                scale: 2,
                required: false,
                unique: false,
                isAIPredictionField: true,
                description: "number description",
                inlineHelpText: "number help",
            },
            {
                fullName: "percent__c",
                label: "Percent Field",
                type: "Percent",
                precision: 14,
                scale: 2,
                required: false,
                description: "percent description",
                inlineHelpText: "percent help",
            },
            {
                fullName: "phone__c",
                label: "Phone",
                type: "Phone",
                required: false,
                description: "Phone number of the contact",
                inlineHelpText: "+1 (555) 123-4567",
            },
            {
                fullName: "picklist__c",
                label: "Picklist Field",
                type: "Picklist",
                required: false,
                description: "picklist description",
                inlineHelpText: "picklist help text",
                valueSet: {
                    restricted: true,
                    values: [
                        { fullName: "value 1", label: "value 1", default: false },
                        { fullName: "value 2", label: "value 2", default: false },
                        { fullName: "value 3", label: "value 3", default: false },
                    ],
                },
            },
            {
                fullName: "picklist_multi_select__c",
                label: "Multiselect Picklist",
                type: "MultiselectPicklist",
                required: false,
                description: "picklist description",
                inlineHelpText: "picklist help text",
                valueSet: {
                    restricted: true,
                    sorted: false,
                    values: [
                        { fullName: "value 1", label: "value 1", default: false },
                        { fullName: "value 2", label: "value 2", default: false },
                        { fullName: "value 3", label: "value 3", default: false },
                    ],
                },
                trackHistory: false,
                visibleLines: 4,
            },
            {
                fullName: "text__c",
                label: "Text Field",
                type: "Text",
                length: 20,
                required: false,
                unique: false,
                description: "text description",
                inlineHelpText: "text help text",
                externalId: false,
                trackHistory: false,
                trackTrending: false,
            },
            {
                fullName: "text_area__c",
                label: "Text Area Field",
                type: "TextArea",
                required: false,
                description: "text area description",
                inlineHelpText: "text area help",
                trackHistory: false,
                trackTrending: false,
            },
            {
                fullName: "text_area_encrypted__c",
                label: "Encrypted Text Area",
                type: "EncryptedText",
                required: false,
                length: 12,
                maskChar: "asterisk",
                maskType: "ssn",
                description: "text area encrypted description",
                inlineHelpText: "text area encrypted help",
                trackHistory: false,
                trackTrending: false,
            },
            {
                fullName: "text_area_long__c",
                label: "Long Text Area",
                type: "LongTextArea",
                length: 32768,
                visibleLines: 3,
                description: "text area long description",
                inlineHelpText: "text area long help text",
                trackHistory: false,
                trackTrending: false,
            },
            {
                fullName: "text_area_rich__c",
                label: "Rich Text Area",
                type: "Html",
                length: 32768,
                visibleLines: 25,
                description: "text area rich description",
                inlineHelpText: "text area rich help",
                trackHistory: false,
                trackTrending: false,
            },
            {
                fullName: "time__c",
                label: "Time Field",
                type: "Time",
                required: false,
                description: "time description",
                inlineHelpText: "time help text",
                trackHistory: false,
                trackTrending: false,
            },
            {
                fullName: "url__c",
                label: "Website URL",
                type: "Url",
                required: false,
                description: "url description",
                inlineHelpText: "Please enter a valid URL starting with http:// or https://",
                trackHistory: false,
                trackTrending: false,
            },
            // {
            //   type: "Summary",
            //   label: "Rollup Summary",
            //   fullName: "rollup_summary__c",
            //   description: "roll up summary description",
            //   inlineHelpText: "rollup summary text",
            //   summarizedField: "kitchen_sink_child__c.CreatedDate",
            //   summaryForeignKey: "kitchen_sink_child__c.Kitchen_Sink__c",
            //   summaryOperation: "min",
            //   trackHistory: false,
            //   trackTrending: false,
            // },
        ],
    },
];
const newSchema = [
    {
        "type": "CustomObject",
        "fullName": "Product_Catalog__c",
        "label": "Product Catalog",
        "pluralLabel": "Product Catalogs",
        "description": "Catalog of products available for sale",
        "deploymentStatus": "Deployed",
        "allowInChatterGroups": true,
        "nameField": {
            "label": "Product Name",
            "type": "Text",
            "trackHistory": false
        },
        "enableActivities": true,
        "enableBulkApi": true,
        "enableFeeds": false,
        "enableHistory": true,
        "enableLicensing": false,
        "enableReports": true,
        "enableSearch": true,
        "enableSharing": true,
        "enableStreamingApi": true,
        "visibility": "Public",
        "fields": [
            {
                "type": "AutoNumber",
                "label": "Product SKU",
                "fullName": "Product_SKU__c",
                "displayFormat": "SKU-{0000}",
                "description": "System-generated product SKU for tracking",
                "inlineHelpText": "Unique product identifier. Example: SKU-0001",
                "startingNumber": 1000
            },
            {
                "type": "Checkbox",
                "label": "Is Active",
                "fullName": "Is_Active__c",
                "defaultValue": true,
                "description": "Indicates if the product is currently active",
                "inlineHelpText": "Check this box if the product is available for sale",
                "trackHistory": false,
                "required": false,
                "externalId": false
            },
            {
                "type": "Currency",
                "fullName": "Unit_Price__c",
                "label": "Unit Price",
                "defaultValue": 0,
                "description": "Price per unit of the product",
                "inlineHelpText": "Enter the unit price in USD",
                "precision": 18,
                "scale": 2,
                "required": true
            },
            {
                "fullName": "Launch_Date__c",
                "label": "Launch Date",
                "type": "Date",
                "defaultValue": "DATE(2026,1,19)",
                "description": "Date when the product was launched",
                "inlineHelpText": "Select the product launch date",
                "required": false
            },
            {
                "fullName": "Last_Updated__c",
                "label": "Last Updated",
                "type": "DateTime",
                "defaultValue": "NOW()",
                "description": "Date and time of last update",
                "inlineHelpText": "Automatically set to current date/time",
                "required": false
            },
            {
                "fullName": "Supplier_Email__c",
                "label": "Supplier Email",
                "type": "Email",
                "description": "Primary email address of the supplier",
                "inlineHelpText": "Enter a valid email address",
                "required": false,
                "caseSensitive": false,
                "unique": false,
                "externalId": false
            },
            {
                "fullName": "Warehouse_Location__c",
                "label": "Warehouse Location",
                "type": "Location",
                "description": "Geographic coordinates of the warehouse",
                "inlineHelpText": "Enter latitude and longitude",
                "required": false,
                "displayLocationInDecimal": true,
                "scale": 5
            },
            {
                "fullName": "Stock_Quantity__c",
                "label": "Stock Quantity",
                "type": "Number",
                "precision": 10,
                "scale": 0,
                "required": true,
                "unique": false,
                "isAIPredictionField": false,
                "description": "Current quantity in stock",
                "inlineHelpText": "Enter the number of units available"
            },
            {
                "fullName": "Discount_Rate__c",
                "label": "Discount Rate",
                "type": "Percent",
                "precision": 5,
                "scale": 2,
                "required": false,
                "description": "Discount percentage applied to unit price",
                "inlineHelpText": "Enter discount as a percentage"
            },
            {
                "fullName": "Supplier_Phone__c",
                "label": "Supplier Phone",
                "type": "Phone",
                "required": false,
                "description": "Phone number of the supplier",
                "inlineHelpText": "+1 (555) 123-4567"
            },
            {
                "fullName": "Product_Category__c",
                "label": "Product Category",
                "type": "Picklist",
                "required": true,
                "description": "Primary category of the product",
                "inlineHelpText": "Select the appropriate product category",
                "valueSet": {
                    "restricted": true,
                    "values": [
                        {
                            "fullName": "Electronics",
                            "label": "Electronics",
                            "default": true
                        },
                        {
                            "fullName": "Clothing",
                            "label": "Clothing",
                            "default": false
                        },
                        {
                            "fullName": "Home_Goods",
                            "label": "Home Goods",
                            "default": false
                        },
                        {
                            "fullName": "Sports",
                            "label": "Sports & Outdoors",
                            "default": false
                        }
                    ]
                }
            },
            {
                "fullName": "Product_Tags__c",
                "label": "Product Tags",
                "type": "MultiselectPicklist",
                "required": false,
                "description": "Multiple tags for product categorization",
                "inlineHelpText": "Select one or more applicable tags",
                "valueSet": {
                    "restricted": true,
                    "sorted": false,
                    "values": [
                        {
                            "fullName": "New_Arrival",
                            "label": "New Arrival",
                            "default": false
                        },
                        {
                            "fullName": "Best_Seller",
                            "label": "Best Seller",
                            "default": false
                        },
                        {
                            "fullName": "On_Sale",
                            "label": "On Sale",
                            "default": false
                        },
                        {
                            "fullName": "Limited_Edition",
                            "label": "Limited Edition",
                            "default": false
                        }
                    ]
                },
                "trackHistory": false,
                "visibleLines": 4
            },
            {
                "fullName": "Product_Code__c",
                "label": "Product Code",
                "type": "Text",
                "length": 50,
                "required": false,
                "unique": false,
                "description": "Unique external product code",
                "inlineHelpText": "Enter the manufacturer's product code",
                "externalId": true,
                "trackHistory": false,
                "trackTrending": false
            },
            {
                "fullName": "Short_Description__c",
                "label": "Short Description",
                "type": "TextArea",
                "required": false,
                "description": "Brief product description",
                "inlineHelpText": "Enter a short product summary",
                "trackHistory": false,
                "trackTrending": false
            },
            {
                "fullName": "Encrypted_Serial_Number__c",
                "label": "Encrypted Serial Number",
                "type": "EncryptedText",
                "required": false,
                "length": 175,
                "maskChar": "asterisk",
                "maskType": "ssn",
                "description": "Encrypted product serial number",
                "inlineHelpText": "Secure serial number storage",
                "trackHistory": false,
                "trackTrending": false
            },
            {
                "fullName": "Full_Description__c",
                "label": "Full Description",
                "type": "LongTextArea",
                "length": 32768,
                "visibleLines": 5,
                "description": "Detailed product description",
                "inlineHelpText": "Enter comprehensive product details",
                "trackHistory": false,
                "trackTrending": false
            },
            {
                "fullName": "Marketing_Content__c",
                "label": "Marketing Content",
                "type": "Html",
                "length": 32768,
                "visibleLines": 25,
                "description": "Rich text marketing content",
                "inlineHelpText": "Enter formatted marketing copy",
                "trackHistory": false,
                "trackTrending": false
            },
            {
                "fullName": "Preferred_Delivery_Time__c",
                "label": "Preferred Delivery Time",
                "type": "Time",
                "required": false,
                "description": "Preferred time for delivery",
                "inlineHelpText": "Select delivery time window",
                "trackHistory": false,
                "trackTrending": false
            },
            {
                "fullName": "Product_Website__c",
                "label": "Product Website",
                "type": "Url",
                "required": false,
                "description": "Product information website",
                "inlineHelpText": "Enter URL starting with http:// or https://",
                "trackHistory": false,
                "trackTrending": false
            },
            // {
            //   "type": "Formula",
            //   "label": "Discounted Price",
            //   "fullName": "Discounted_Price__c",
            //   "returnType": "Currency",
            //   "formula": "$20.00",
            //   "blankOption": "BlankAsZero",
            //   "description": "Calculated price after applying discount",
            //   "inlineHelpText": "Automatically calculated: Unit Price minus Discount Rate",
            //   "externalId": false,
            //   "required": false,
            //   "unique": false,
            //   "trackHistory": false
            // }
        ]
    }
];
const transpiler = new SalesforceMetadataTranspiler(transpilerConfig);
async function transpileSchema() {
    const generatedXml = await transpiler.transpile(newSchema);
    console.log(generatedXml);
    const builder = new PackageBuilder({
        outputDirectory: "./package.zip",
        outputMode: "zip",
    });
    const result = await builder.build(generatedXml);
    if (result.success) {
        console.log("Package built successfully!");
    }
    else {
        console.error("Failed to build package:", result.errors);
    }
}
transpileSchema();

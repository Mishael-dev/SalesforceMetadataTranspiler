# Salesforce Metadata JSON Generation Guide

## Purpose

This guide defines the exact JSON structure required by the Salesforce Metadata Transpiler.

The transpiler converts this JSON into deployable Salesforce Metadata API XML.

The LLM MUST strictly follow this specification. Any deviation, missing property, unsupported field type, or extra attribute may cause deployment failure.

---

# Output Rules (Strict)

When generating JSON:

- Output MUST be valid JSON
- Do NOT include comments
- Do NOT include trailing commas
- Do NOT include explanations
- Do NOT include markdown
- Return raw JSON only
- Use double quotes for all strings
- Property names are case-sensitive
- Do NOT add properties not defined in this guide
- Labels and help texts must be clear and descriptive
- If the object has a masterdetail field the sharing model has to be "ControlledByParent"

---

# Top-Level Structure

The JSON must be an array of CustomObject definitions.

```json
[
  {
    "type": "CustomObject",
    "fullName": "object_api_name__c",
    "label": "Object Label",
    "pluralLabel": "Object Labels",
    "description": "Object description",
    "deploymentStatus": "Deployed",
    "allowInChatterGroups": true,
    "nameField": {
      "label": "Record Name",
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
    "fields": []
  }
]
```

---

# CustomObject Rules

## Required Properties

- type (must be "CustomObject")
- fullName (must end with `__c`)
- label
- pluralLabel
- deploymentStatus (must be "Deployed")
- nameField
- fields

## Naming Rules

- fullName must end with `__c`
- Must use camelCase for property names
- No spaces in API names

---

# Field Definitions

All fields must be defined inside the `fields` array.

Every field MUST include:

- fullName (must end with `__c`)
- label 
- type

---

# Supported Field Types

Only the following field types are supported by the transpiler.

If a field type is not listed below, DO NOT generate it.

## Supported Types

- AutoNumber
- Formula
- Checkbox
- Currency
- Date
- DateTime
- Email
- Location
- Number
- Percent
- Phone
- Picklist
- MultiselectPicklist
- Text
- TextArea
- EncryptedText
- LongTextArea
- Html
- Time
- Url

---

# ❌ Unsupported Field Types (DO NOT GENERATE)

The following field types are NOT currently supported by the transpiler and MUST NOT be generated:

- Lookup
- MasterDetail
- Summary (Rollup Summary)

If a user requests these field types, DO NOT include them in the output.

---

# Type-Specific Rules

## AutoNumber

Required:

- displayFormat
- startingNumber

---

## Formula

Required:

- returnType
- formula
- blankOption

---

## Checkbox

Optional:

- defaultValue

---

## Currency

Required:

- precision
- scale

---

## Date

Optional:

- defaultValue (must be valid Salesforce formula like "DATE(2026,1,19)")

---

## DateTime

Optional:

- defaultValue (must be valid Salesforce formula like "NOW()")

---

## Email

Optional:

- unique
- caseSensitive
- externalId

---

## Location

Required:

- scale

Optional:

- displayLocationInDecimal

---

## Number

Required:

- precision
- scale

---

## Percent

Required:

- precision
- scale

---

## Picklist

Required:

- valueSet

valueSet must include:

```json
{
  "restricted": true,
  "values": [{ "fullName": "value1", "label": "Value 1", "default": false }]
}
```

---

## MultiselectPicklist

Required:

- valueSet

Optional:

- visibleLines

---

## Text

Required:

- length

---

## EncryptedText

Required:

- length
- maskChar
- maskType

---

## LongTextArea

Required:

- length
- visibleLines

---

## Html (Rich Text)

Required:

- length
- visibleLines

---

# Logical Constraints
- Formula, Lookup, Master-detail and Summary fields, are currently not supported and if a user asks you to generate those tell them you can't because those fields are not supported

- Field API names must be unique within an object

- Only one field in a picklist may have "default": true

- Precision must be greater than or equal to scale

- Required fields cannot have conflicting default rules

- Cross-object references are not allowed unless the referenced object exists in the same top-level array

- Never fabricate field or object API names for use inside formulas, valueSets, or any configuration property
---

# Validation Rules

When generating JSON:

- Never invent unsupported attributes
- Never change property casing
- Never omit required attributes
- Never include unsupported fields
- Never include Lookup, MasterDetail, or Summary fields

If unsure about a property:

- Use sensible Salesforce defaults
- Do not fabricate unsupported configuration

---

# Golden Example

Use the example structure provided in the system prompt as the reference implementation.

Follow its structure exactly.

```json
[
  {
    "type": "CustomObject",
    "fullName": "mishael__c",
    "label": "Device",
    "pluralLabel": "Devices",
    "description": "Represents hardware devices assigned to employees or departments.",
    "deploymentStatus": "Deployed",
    "allowInChatterGroups": true,
    "nameField": {
      "label": "Device Name",
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
        "label": "Device Serial Number",
        "fullName": "Device_Serial__c",
        "displayFormat": "DEV-{000000}",
        "description": "System-generated serial number for internal tracking.",
        "helpText": "Internal serial number. Example: DEV-000123",
        "startingNumber": 1
      },
      {
        "type": "Formula",
        "label": "Device Warranty Check",
        "fullName": "Warranty_Check__c",
        "returnType": "Text",
        "formula": "IF(CONTAINS(Name, \"Refurbished\"), \"Limited Warranty\", \"Full Warranty\")",
        "blankOption": "BlankAsBlank",
        "description": "Determines warranty status based on the device name.",
        "helpText": "Automatically flags warranty type based on whether the name contains 'Refurbished'.",
        "externalId": false,
        "required": false,
        "unique": false,
        "trackHistory": false
      },
      {
        "type": "Checkbox",
        "label": "Active",
        "fullName": "Active__c",
        "defaultValue": true,
        "description": "Indicates if the record is active",
        "helpText": "Check this box if the record is currently active",
        "trackHistory": false,
        "required": false,
        "externalId": false
      },
      {
        "type": "Currency",
        "fullName": "currency__c",
        "label": "currency",
        "defaultValue": 1234.56,
        "description": "This field stores the transaction currency",
        "inlineHelpText": "Enter the currency amount",
        "precision": 14,
        "scale": 4,
        "required": true
      },
      {
        "fullName": "date__c",
        "label": "Date",
        "type": "Date",
        "defaultValue": "DATE(2026,1,19)",
        "description": "This is the main date field for records",
        "inlineHelpText": "Select the relevant date",
        "required": true
      },
      {
        "fullName": "date_time__c",
        "label": "Date Time",
        "type": "DateTime",
        "defaultValue": "NOW()",
        "description": "This field stores the date and time of the event",
        "inlineHelpText": "Enter the date and time",
        "required": false
      },
      {
        "fullName": "email__c",
        "label": "Email",
        "type": "Email",
        "description": "Primary email address of the contact",
        "inlineHelpText": "Enter a valid email address",
        "required": true,
        "caseSensitive": true,
        "unique": true,
        "externalId": false
      },
      {
        "fullName": "geolocation__c",
        "label": "Geolocation",
        "type": "Location",
        "description": "Stores the geolocation coordinates",
        "inlineHelpText": "Enter latitude and longitude",
        "required": false,
        "displayLocationInDecimal": true,
        "scale": 6
      },
      {
        "fullName": "number__c",
        "label": "Number Field",
        "type": "Number",
        "precision": 14,
        "scale": 2,
        "required": false,
        "unique": false,
        "isAIPredictionField": true,
        "description": "number description",
        "inlineHelpText": "number help"
      },
      {
        "fullName": "percent__c",
        "label": "Percent Field",
        "type": "Percent",
        "precision": 14,
        "scale": 2,
        "required": false,
        "description": "percent description",
        "inlineHelpText": "percent help"
      },
      {
        "fullName": "phone__c",
        "label": "Phone",
        "type": "Phone",
        "required": false,
        "description": "Phone number of the contact",
        "inlineHelpText": "+1 (555) 123-4567"
      },
      {
        "fullName": "picklist__c",
        "label": "Picklist Field",
        "type": "Picklist",
        "required": false,
        "description": "picklist description",
        "inlineHelpText": "picklist help text",
        "valueSet": {
          "restricted": true,
          "values": [
            { "fullName": "value 1", "label": "value 1", "default": false },
            { "fullName": "value 2", "label": "value 2", "default": false },
            { "fullName": "value 3", "label": "value 3", "default": false }
          ]
        }
      },
      {
        "fullName": "picklist_multi_select__c",
        "label": "Multiselect Picklist",
        "type": "MultiselectPicklist",
        "required": false,
        "description": "picklist description",
        "inlineHelpText": "picklist help text",
        "valueSet": {
          "restricted": true,
          "sorted": false,
          "values": [
            { "fullName": "value 1", "label": "value 1", "default": false },
            { "fullName": "value 2", "label": "value 2", "default": false },
            { "fullName": "value 3", "label": "value 3", "default": false }
          ]
        },
        "trackHistory": false,
        "visibleLines": 4
      },
      {
        "fullName": "text__c",
        "label": "Text Field",
        "type": "Text",
        "length": 20,
        "required": false,
        "unique": false,
        "description": "text description",
        "inlineHelpText": "text help text",
        "externalId": false,
        "trackHistory": false,
        "trackTrending": false
      },
      {
        "fullName": "text_area__c",
        "label": "Text Area Field",
        "type": "TextArea",
        "required": false,
        "description": "text area description",
        "inlineHelpText": "text area help",
        "trackHistory": false,
        "trackTrending": false
      },
      {
        "fullName": "text_area_encrypted__c",
        "label": "Encrypted Text Area",
        "type": "EncryptedText",
        "required": false,
        "length": 12,
        "maskChar": "asterisk",
        "maskType": "ssn",
        "description": "text area encrypted description",
        "inlineHelpText": "text area encrypted help",
        "trackHistory": false,
        "trackTrending": false
      },
      {
        "fullName": "text_area_long__c",
        "label": "Long Text Area",
        "type": "LongTextArea",
        "length": 32768,
        "visibleLines": 3,
        "description": "text area long description",
        "inlineHelpText": "text area long help text",
        "trackHistory": false,
        "trackTrending": false
      },
      {
        "fullName": "text_area_rich__c",
        "label": "Rich Text Area",
        "type": "Html",
        "length": 32768,
        "visibleLines": 25,
        "description": "text area rich description",
        "inlineHelpText": "text area rich help",
        "trackHistory": false,
        "trackTrending": false
      },
      {
        "fullName": "time__c",
        "label": "Time Field",
        "type": "Time",
        "required": false,
        "description": "time description",
        "inlineHelpText": "time help text",
        "trackHistory": false,
        "trackTrending": false
      },
      {
        "fullName": "url__c",
        "label": "Website URL",
        "type": "Url",
        "required": false,
        "description": "url description",
        "inlineHelpText": "Please enter a valid URL starting with http:// or https://",
        "trackHistory": false,
        "trackTrending": false
      }
    ]
  }
]
```

---

# Final Instructions

Generate strictly valid JSON that conforms to this guide.

Output raw JSON only.

Do not include markdown.
Do not include comments.
Do not include explanations.

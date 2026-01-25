# Object Documentation: Kitchen Sink Custom Object

This document breaks down the Salesforce **Custom Object XML** for the `Kitchen Sink` object and separates the metadata into categories based on how the transpiler, LLM, and UI will interact with them.

---

Stored in `Kitchen_Sink__c.object-meta.xml`.

## 1. The Outer Container

This wraps the object definition in Salesforce Source Format (SFDX).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">
    <!-- Object content goes here -->
</CustomObject>
```

---

## 2. Core Object Configuration (LLM Generated)

These are the primary intent fields. The LLM must decide these to define the business logic and identity of the custom object.

```xml
<label>Kitchen Sink</label>
<pluralLabel>Kitchen Sinks</pluralLabel>
<description>This is a full-featured kitchen sink object including all fields and settings</description>
<deploymentStatus>Deployed</deploymentStatus>
<enableActivities>true</enableActivities>
<enableBulkApi>true</enableBulkApi>
<enableFeeds>false</enableFeeds>
<enableHistory>true</enableHistory>
<enableLicensing>false</enableLicensing>
<enableReports>true</enableReports>
<enableSearch>true</enableSearch>
<enableSharing>true</enableSharing>
<enableStreamingApi>true</enableStreamingApi>
<externalSharingModel>Private</externalSharingModel>
<sharingModel>ReadWrite</sharingModel>
<visibility>Public</visibility>
<allowInChatterGroups>true</allowInChatterGroups>
<compactLayoutAssignment>SYSTEM</compactLayoutAssignment>
<nameField>
    <label>Kitchen Sink Name</label>
    <trackHistory>false</trackHistory>
    <type>Text</type>
</nameField>
```

---

## 3. Supporting Features (React Flow UI)

These fields provide UI support and are configurable via Salesforce Setup.

```xml
<searchLayouts></searchLayouts>
<actionOverrides>Multiple Action Overrides Defined</actionOverrides>
```

---

## 4. Others (Transpiler Injected)

These fields are considered platform-required metadata and are automatically added by the transpiler. They ensure the XML is valid for the Salesforce Metadata API.

```xml
<!-- System-injected metadata handled automatically by Salesforce -->
```

---

## Json Shape

This section represents the core object definition as a JSON object.

```json
{
  "label": "Kitchen Sink",
  "pluralLabel": "Kitchen Sinks",
  "fullName": "Kitchen_Sink__c",
  "description": "This is a full-featured kitchen sink object including all fields and settings",
  "deploymentStatus": "Deployed",
  "enableActivities": true,
  "enableBulkApi": true,
  "enableFeeds": false,
  "enableHistory": true,
  "enableLicensing": false,
  "enableReports": true,
  "enableSearch": true,
  "enableSharing": true,
  "enableStreamingApi": true,
  "externalSharingModel": "Private",
  "sharingModel": "ReadWrite",
  "visibility": "Public",
  "allowInChatterGroups": true,
  "compactLayoutAssignment": "SYSTEM",
  "nameField": {
    "label": "Kitchen Sink Name",
    "trackHistory": false,
    "type": "Text"
  },
  "actionOverrides": [
    {"actionName": "Accept", "type": "Default"},
    {"actionName": "Accept", "formFactor": "Large", "type": "Default"},
    {"actionName": "Accept", "formFactor": "Small", "type": "Default"},
    {"actionName": "CancelEdit", "type": "Default"},
    {"actionName": "CancelEdit", "formFactor": "Large", "type": "Default"},
    {"actionName": "CancelEdit", "formFactor": "Small", "type": "Default"},
    {"actionName": "Clone", "type": "Default"},
    {"actionName": "Clone", "formFactor": "Large", "type": "Default"},
    {"actionName": "Clone", "formFactor": "Small", "type": "Default"},
    {"actionName": "Delete", "type": "Default"},
    {"actionName": "Delete", "formFactor": "Large", "type": "Default"},
    {"actionName": "Delete", "formFactor": "Small", "type": "Default"},
    {"actionName": "Edit", "type": "Default"},
    {"actionName": "Edit", "formFactor": "Large", "type": "Default"},
    {"actionName": "Edit", "formFactor": "Small", "type": "Default"},
    {"actionName": "List", "type": "Default"},
    {"actionName": "List", "formFactor": "Large", "type": "Default"},
    {"actionName": "List", "formFactor": "Small", "type": "Default"},
    {"actionName": "New", "type": "Default"},
    {"actionName": "New", "formFactor": "Large", "type": "Default"},
    {"actionName": "New", "formFactor": "Small", "type": "Default"},
    {"actionName": "SaveEdit", "type": "Default"},
    {"actionName": "SaveEdit", "formFactor": "Large", "type": "Default"},
    {"actionName": "SaveEdit", "formFactor": "Small", "type": "Default"},
    {"actionName": "Tab", "type": "Default"},
    {"actionName": "Tab", "formFactor": "Large", "type": "Default"},
    {"actionName": "Tab", "formFactor": "Small", "type": "Default"},
    {"actionName": "View", "type": "Default"},
    {"actionName": "View", "formFactor": "Large", "type": "Default"},
    {"actionName": "View", "formFactor": "Small", "type": "Default"}
  ]
}
```

---

## 5. Validation Rules

This section documents the validation rules applied to **Custom Objects** at each validation layer.

### Level 1: Structural Validation (The Shape)

* `label` and `pluralLabel` must be non-empty strings.
* `fullName` must be a valid Salesforce API name ending in `__c`.
* Boolean fields like `enableActivities`, `enableBulkApi`, etc., must be true or false.
* `nameField` must include a `label` and `type`.
* `actionOverrides` must be an array of objects containing `actionName` and `type`, optionally `formFactor`.

---

### Level 2: Logical Validation (The Context)

* `deploymentStatus` must be either `Deployed` or `InDevelopment`.
* `sharingModel` and `externalSharingModel` must be valid Salesforce sharing model values.
* `actionOverrides` must not contain duplicate action/formFactor combinations.
* `nameField.type` must be `Text` or `AutoNumber`.

---

### Level 3: Platform Constraints (The Linter)

* `label` must not exceed 40 characters.
* `pluralLabel` must not exceed 80 characters.
* Maximum number of action overrides per object is limited by Salesforce.
* Boolean fields must be true/false.
* External and internal sharing models must be valid Salesforce enums.

---

### Level 4: State & Conflict Validation (The Pre-Flight)

* Ensure no existing object with the same `fullName` exists in the target org.
* Prevent changing `nameField.type` after object creation.
* Validate that `actionOverrides` do not conflict with existing standard page layouts.
* Check for managed-package or namespace conflicts.
* Confirm that the target org supports all enabled features (Bulk API, Feeds, Activities, Streaming API).

---

## 6. Summary Table for Transpiler Logic

| XML Tag                     | JSON Key                | Source | Default Value      |
| --------------------------- | ----------------------- | ------ | ------------------ |
| `<label>`                   | label                   | LLM    | N/A                |
| `<pluralLabel>`             | pluralLabel             | LLM    | N/A                |
| `<fullName>`                | fullName                | LLM    | Derived from Label |
| `<description>`             | description             | LLM    | Empty String       |
| `<deploymentStatus>`        | deploymentStatus        | LLM    | InDevelopment      |
| `<enableActivities>`        | enableActivities        | UI     | false              |
| `<enableBulkApi>`           | enableBulkApi           | UI     | false              |
| `<enableFeeds>`             | enableFeeds             | UI     | false              |
| `<enableHistory>`           | enableHistory           | UI     | false              |
| `<enableLicensing>`         | enableLicensing         | UI     | false              |
| `<enableReports>`           | enableReports           | UI     | false              |
| `<enableSearch>`            | enableSearch            | UI     | false              |
| `<enableSharing>`           | enableSharing           | UI     | false              |
| `<enableStreamingApi>`      | enableStreamingApi      | UI     | false              |
| `<externalSharingModel>`    | externalSharingModel    | UI     | Private            |
| `<sharingModel>`            | sharingModel            | UI     | ReadWrite          |
| `<visibility>`              | visibility              | UI     | Public             |
| `<allowInChatterGroups>`    | allowInChatterGroups    | UI     | false              |
| `<compactLayoutAssignment>` | compactLayoutAssignment | UI     | SYSTEM             |
| `<nameField>`               | nameField               | LLM    | Text               |
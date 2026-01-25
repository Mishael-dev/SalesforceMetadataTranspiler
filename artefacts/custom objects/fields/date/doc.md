# Field Documentation: Date

This document breaks down the Salesforce **Date Custom Field XML** and separates the metadata into categories based on how the transpiler, LLM, and UI will interact with them.

---

Stored in `date__c.field-meta.xml`.

## 1. The Outer Container

This wraps the field definition in Salesforce Source Format (SFDX).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
    <!-- Field content goes here -->
</CustomField>
```

---

## 2. Core Field Configuration (LLM Generated)

These are the primary intent fields. The LLM defines the business logic, identity, and default value of the Date field.

```xml
<fullName>date__c</fullName>
<label>date</label>
<defaultValue>DATE(1,1,1)</defaultValue>
<description>date description</description>
<inlineHelpText>date help</inlineHelpText>
<required>true</required>
```

---

## 3. Supporting Features (React Flow UI)

These fields are displayed in the React Flow interface for toggling platform features but are not core to the field's identity.

```xml
<trackHistory>false</trackHistory>
```

---

## 4. Others (Transpiler Injected)

These fields are automatically added by the transpiler or required by Salesforce to ensure the XML is valid.

```xml
<type>Date</type>
<trackTrending>false</trackTrending>
```

---

## Json Shape

This section represents the core field definition as a JSON object.

```json
{
  "type": "Date",
  "label": "date",
  "fullName": "date__c",
  "defaultValue": "DATE(1,1,1)",
  "description": "date description",
  "inlineHelpText": "date help",
  "required": true
}
```

---

## 5. Validation Rules

This section documents the validation rules applied to **Date** fields at each validation layer in the transpiler pipeline.

### Level 1: Structural Validation (The Shape)

* `type` must be exactly `Date`.
* `label` must be a non-empty string.
* `fullName` must be a valid Salesforce custom field API name ending in `__c`.
* `defaultValue` must be a valid Salesforce DATE expression or empty.
* `required` must be a boolean.

---

### Level 2: Logical Validation (The Context)

* `defaultValue` should represent a valid date (YYYY,MM,DD). Values like `DATE(1,1,1)` are syntactically correct but may require context validation.
* `required` cannot be false if business logic mandates the field to always have a value.

---

### Level 3: Platform Constraints (The Linter)

* `fullName` (API name, excluding `__c`) must not exceed **40 characters**.
* `label` must not exceed **40 characters**.
* Date fields **cannot** have unsupported functions or formulas in `defaultValue`.
* `defaultValue` expressions must be compatible with Salesforce DATE formula syntax.
* `required` fields must have a valid default or be populated during record creation.

---

### Level 4: State & Conflict Validation (The Pre-Flight)

* Verify that no existing field with the same `fullName` already exists on the target object.
* Prevent changes to `type` once the field is created.
* Confirm that changing `required` does not conflict with existing records that may have null values.
* Validate that the target object is **not managed-package locked**.
* Detect namespace collisions in namespaced orgs.
---

## 6. Summary Table for Transpiler Logic

| XML Tag            | JSON Key       | Source | Default Value      |
| ------------------ | -------------- | ------ | ------------------ |
| `<fullName>`       | fullName       | LLM    | Derived from Label |
| `<label>`          | label          | LLM    | N/A                |
| `<defaultValue>`   | defaultValue   | LLM    | None               |
| `<description>`    | description    | LLM    | Empty String       |
| `<inlineHelpText>` | inlineHelpText | LLM    | Empty String       |
| `<required>`       | required       | LLM    | false              |
| `<trackHistory>`   | trackHistory   | UI     | false              |
| `<type>`           | type           | System | Date               |
| `<trackTrending>`  | N/A            | System | false              |

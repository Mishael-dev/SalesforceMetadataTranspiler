# Field Documentation: Formula Field

This document breaks down the Salesforce **Formula Custom Field XML** based on the exported metadata. It separates the core logic from the supporting UI features and system-injected metadata.

---

## 1. The Outer Container

Stored in `Formula_Field__c.field-meta.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
    <!-- Field content goes here -->
</CustomField>
```

---

## 2. Core Field Configuration (LLM Generated)

These are the primary intent fields. The LLM must define the formula logic, the return type, and the identity of the field. Note that characters like `"` and `&` are XML-encoded as `&quot;` and `&amp;`.

```xml
<fullName>Formula_Field__c</fullName>
<label>Formula Field</label>
<type>Text</type>
<formula>IF(NOT(ISBLANK(AutoNumber__c)), &quot;ACTIVE: &quot; &amp; Name, &quot;INACTIVE&quot;)</formula>
<formulaTreatBlanksAs>BlankAsZero</formulaTreatBlanksAs>
<description>A kitchen sink formula field that combines a checkbox status with the record name.</description>
<inlineHelpText>Help Text: Shows the status prefix followed by the name.</inlineHelpText>
```

---

## 3. Supporting Features (React Flow UI)

These fields are defaulted by the system/transpiler but are visible in the React Flow interface for user modification.

```xml
<externalId>false</externalId>
<required>false</required>
<unique>false</unique>
<trackHistory>false</trackHistory>
```

---

## 4. Others (Transpiler Injected)

These fields are automatically added by the transpiler to ensure compatibility with the Salesforce Metadata API.

```xml
<trackTrending>false</trackTrending>
```

---
## Json Shape

This section represents the core field definition as a JSON object.

```json
 {
    type: "Formula",
    label: "Asset Status Label",
    fullName: "Asset_Status_Label__c",
    returnType: "Text",
    formula: 'IF(NOT(ISBLANK(Asset_ID__c)), "ACTIVE: " & Name, "INACTIVE")',
    blankOption: "BlankAsZero",
    description: "Human-readable status based on assigned ID.",
    inlineHelpText: "Shows ACTIVE or INACTIVE followed by the record name."
 }
```
---

## 5. Validation Rules

This section documents the validation rules applied to **Formula** fields at each validation layer in the transpiler pipeline.

### Level 1: Structural Validation (The Shape)

Ensures the JSON matches the Formula field schema.

* `formula` must be a non-empty string.
* `returnType` must be a valid Salesforce formula return type (`Text`, `Number`, `Currency`, `Percent`, `Date`, `DateTime`, `Checkbox`).
* `fullName` must be a valid Salesforce custom field API name ending in `__c`.
* `formulaTreatBlanksAs` must be a valid enum value.

---

### Level 2: Logical Validation (The Context)

Ensures internal consistency and dependency correctness.

* `formula` must reference only fields that exist on the same object.
* Referenced fields must be compatible with the selected `returnType`.
* `formulaTreatBlanksAs` must be compatible with the `returnType` (e.g., `BlankAsZero` is invalid for `Text`).
* `externalId` must be `false` (Formula fields cannot be External IDs).
* `required` must be `false` (Formula fields are implicitly calculated).
* `unique` must be `false` (Formula fields cannot enforce uniqueness).

---

### Level 3: Platform Constraints (The Linter)

Enforces hard Salesforce platform rules that are impractical to encode fully in Zod schemas.

* Formula length must not exceed **3,900 characters**.
* Compiled formula size must not exceed Salesforce limits.
* `label` must not exceed **40 characters**.
* `fullName` (API name excluding `__c`) must not exceed **40 characters**.
* Formula fields **cannot reference themselves**, directly or indirectly.
* Formula fields cannot reference:

  * Encrypted fields
  * Long Text Area fields
  * Rich Text Area fields
* Cross-object references are limited by Salesforce relationship depth constraints.
* Formula fields cannot be used as **External IDs**, **Unique fields**, or **Primary Keys**.

Violations at this level should be surfaced as **linter errors** with precise feedback.

---

### Level 4: State & Conflict Validation (The Pre-Flight)

An optional runtime validation layer that inspects the target Salesforce org before deployment.

* Verify that no existing field with the same `fullName` already exists on the target object.
* If the Formula field already exists:

  * Prevent changes to `returnType`.
  * Prevent incompatible changes to `formulaTreatBlanksAs`.
  * Validate that the updated formula does not exceed compiled size limits.
* Validate that all referenced fields still exist in the target org.
* Detect dependency chains that would break existing formulas or roll-up summaries.
* Validate that the target object is not **managed-package locked**.

Failures at this level should be reported as **pre-deployment conflicts**, not schema errors.

---

## 6. Summary Table for Transpiler Logic

| XML Tag                  | JSON Key    | Source     | Default Value      |
| ------------------------ | ----------- | ---------- | ------------------ |
| `<fullName>`             | fullName    | LLM        | Derived from Label |
| `<label>`                | label       | LLM        | N/A                |
| `<formula>`              | formula     | LLM        | N/A                |
| `<type>`                 | returnType  | LLM        | Text               |
| `<formulaTreatBlanksAs>` | blankOption | LLM/System | BlankAsZero        |
| `<description>`          | description | LLM        | Empty String       |
| `<inlineHelpText>`       | inlineHelpText    | LLM        | Empty String       |
| `<externalId>`           | externalId  | UI         | false              |
| `<required>`             | required    | UI         | false              |
| `<unique>`               | unique      | UI         | false              |
| `<trackTrending>`        | N/A         | System     | false              |
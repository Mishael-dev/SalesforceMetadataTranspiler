# Field Documentation: Lookup Field

This document breaks down the Salesforce **Lookup Custom Field XML** and separates the metadata into categories based on how the transpiler, LLM, and UI will interact with them. It also serves as the specification for building Zod validation for Lookup fields.

---

Stored in `LookUp__c.field-meta.xml`.

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

These are the **primary intent fields**. The LLM must define these to establish the relationship between two objects and how that relationship behaves.

```xml
<fullName>Lookup_Field__c</fullName>
<label>Kitchen Sink Reference</label>
<referenceTo>Kitchen_Sink__c</referenceTo>
<relationshipLabel>Kitchen Sinks</relationshipLabel>
<relationshipName>Kitchen_Sinks</relationshipName>
<deleteConstraint>SetNull</deleteConstraint>
<description>This is the description for the lookup field</description>
<inlineHelpText>This is the help text for the lookup field</inlineHelpText>
```

**Intent breakdown**

* `referenceTo` defines the **parent object** being referenced.
* `relationshipName` defines the **API name** used for child-to-parent traversal.
* `relationshipLabel` defines the **UI label** for the related list.
* `deleteConstraint` controls what happens to child records when the parent is deleted. Valid options for Lookup fields are:

  * `SetNull`: Clears the field on child records when the parent is deleted.
  * `Restrict`: Prevents deletion of the parent record if any child records reference it.

**Future Extension:** Salesforce supports `<lookupFilter>` blocks to restrict selectable records. This is not implemented in v1.

---

## 3. Supporting Features (React Flow UI)

These fields are defaulted by the schema but exposed in the UI so users can tune record behavior.

```xml
<required>false</required>
<trackHistory>false</trackHistory>
```

---

## 4. Others (Transpiler Injected)

These fields are automatically injected by the transpiler to satisfy Salesforce Metadata API requirements.

```xml
<type>Lookup</type>
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
    helpText: "Shows ACTIVE or INACTIVE followed by the record name."
 }
```

## 5. Validation Rules

This section documents validation rules applied to **Lookup fields** at each validation layer in the transpiler pipeline.

### Level 1: Structural Validation (The Shape)

Ensures the JSON matches the Lookup field schema.

* `type` must be exactly `Lookup`.
* `label` must be a non-empty string.
* `fullName` must be a valid Salesforce custom field API name ending in `__c`.
* `referenceTo`, `relationshipName`, and `relationshipLabel` must be strings.

---

### Level 2: Logical Validation (The Context)

Ensures internal consistency and relationship correctness.

* `relationshipName` must be provided when `referenceTo` is defined.
* `relationshipLabel` must be provided when `relationshipName` exists.
* `deleteConstraint` must be one of `SetNull` or `Restrict`.
* `referenceTo` must point to an object defined in the schema graph.
* `required = true` is only allowed when `deleteConstraint = Restrict`.

#### Object-Level Logical Validation

* `relationshipName` must be unique across all Lookup and Master-Detail fields on the **parent object**.
* `relationshipName` must not match the parent object's API name.
* Multiple lookups to the same object must use distinct `relationshipName` values.

---

### Level 3: Platform Constraints (The Linter)

Enforces hard Salesforce platform limits and rules that cannot be fully expressed in Zod.

* `fullName` (API name excluding `__c`) must not exceed **40 characters**.
* `label` must not exceed **40 characters**.
* `relationshipName` must not exceed **40 characters** and must be alphanumeric with underscores.
* `relationshipLabel` must not exceed **80 characters**.
* Lookup fields **cannot be encrypted**.
* Lookup fields cannot be marked as **External IDs**.
* Cross-object relationship depth limits must be respected when referenced by formulas or roll-ups.
* Circular relationships between objects are not allowed.

Violations at this level should surface as **linter errors** with precise remediation guidance.

---

### Level 4: State & Conflict Validation (The Pre-Flight)

An optional runtime validation layer that inspects the target Salesforce org prior to deployment.

* Verify that no existing field with the same `fullName` exists on the target object.
* If the field already exists:

  * Prevent changes to `referenceTo`.
  * Prevent changes to `relationshipName`.
  * Prevent conversion between Lookup and Master-Detail.
* Validate that the referenced object exists in the target org and is deployable.
* Validate that the target object is not **managed-package locked**.
* Detect namespace collisions in namespaced orgs.
* Detect destructive delete behavior conflicts with existing data (e.g., `Restrict` with existing child records).

Failures at this level should be reported as **pre-deployment conflicts**, not schema validation errors.

---

## 6. Summary Table for Transpiler Logic

| XML Tag               | JSON Key          | Source | Default Value |
| --------------------- | ----------------- | ------ | ------------- |
| `<fullName>`          | fullName          | LLM    | Derived       |
| `<label>`             | label             | LLM    | N/A           |
| `<referenceTo>`       | referenceTo       | LLM    | N/A           |
| `<relationshipName>`  | relationshipName  | LLM    | N/A           |
| `<relationshipLabel>` | relationshipLabel | LLM    | N/A           |
| `<deleteConstraint>`  | deleteConstraint  | LLM    | SetNull       |
| `<description>`       | description       | LLM    | Empty String  |
| `<inlineHelpText>`    | inlineHelpText          | LLM    | Empty String  |
| `<required>`          | required          | UI     | false         |
| `<trackHistory>`      | trackHistory      | UI     | false         |
| `<type>`              | type              | System | Lookup        |
| `<trackTrending>`     | N/A               | System | false         |

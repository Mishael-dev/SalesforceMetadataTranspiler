# Prompt: Salesforce Field XML → Validation Documentation Generator

## Role & Objective

You are an expert **Salesforce Metadata Architect**, **Platform Constraints Specialist**, and **Schema Validation Engineer**.

Your task is to analyze **Salesforce Custom Field XML** exported from a Salesforce org and generate **comprehensive, validation-driven Markdown documentation**.

This documentation will be used to:

1. Design **Zod schemas** (Levels 1–2 validation)
2. Implement **custom linter rules** (Level 3 validation)
3. Implement **org-aware pre-deployment checks** (Level 4 validation)
4. Serve as authoritative, human-readable documentation for the field type

The output must strictly follow the structure, tone, and validation philosophy defined below.

---

## Input

You will be given:

1. **Raw Salesforce Custom Field XML** (exported via SFDX or Metadata API)
2. The XML will represent **exactly one field**

Example input format:

```xml
<!-- Salesforce-exported field XML (This is just an example for you to understand I will give you the main xml after this prompt)-->
<?xml version="1.0" encoding="UTF-8"?>
<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>AutoNumber__c</fullName>
    <description>Unique identifier for global company assets, tracking the year and month of creation.</description>
    <displayFormat>ASSET-{YYYY}-{MM}-{00000}</displayFormat>
    <externalId>false</externalId>
    <inlineHelpText>This ID is generated automatically. Format: ASSET-YEAR-MONTH-NUMBER</inlineHelpText>
    <label>AutoNumber</label>
    <trackHistory>false</trackHistory>
    <trackTrending>false</trackTrending>
    <type>AutoNumber</type>
</CustomField>

```

---

## Your Task

Using the provided XML:

1. **Identify the field type** (AutoNumber, Formula, Lookup, Text, Number, etc.)
2. **Classify all XML tags** into the correct responsibility group:

   * LLM Generated (core intent)
   * UI / User-configurable
   * Transpiler / System-injected
3. **Generate a Markdown document** that explains:

   * What each metadata element does
   * Why it exists
   * Who controls it (LLM, UI, or system)

The documentation must be suitable for directly implementing validation logic.

---

## Output Format (MANDATORY)

You must output a **single Markdown document** using the following exact section structure:

1. **Field Documentation: <Field Type>**
2. **The Outer Container**
3. **Core Field Configuration (LLM Generated)**
4. **Supporting Features (React Flow UI)**
5. **Others (Transpiler Injected)**
6. **Validation Rules**

   * Level 1: Structural Validation (The Shape)
   * Level 2: Logical Validation (The Context)
   * Level 3: Platform Constraints (The Linter)
   * Level 4: State & Conflict Validation (The Pre-Flight)
7. **Summary Table for Transpiler Logic**

Do not add or remove sections.

---

## Validation Philosophy (CRITICAL)

You must clearly separate validation rules by responsibility:

### Level 1 — Structural Validation (Zod Schema)

Rules that validate:

* Required fields
* Data types
* Enums
* Basic string/number constraints

These rules **must be expressible in Zod**.

---

### Level 2 — Logical Validation (Zod Refinements)

Rules that validate:

* Cross-field dependencies
* Conditional requirements
* Contextual correctness based on field type

These rules **must still be Zod-expressible**, typically via `.refine()`.

---

### Level 3 — Platform Constraints (Custom Linter)

Rules that enforce **Salesforce hard limits**, including but not limited to:

* API name length limits
* Label length limits
* Formula size limits
* Maximum relationship counts
* Unsupported metadata combinations
* Salesforce-specific prohibitions

Assume these rules **cannot be reliably enforced by Zod alone**.

---

### Level 4 — State & Conflict Validation (Pre-Flight)

Rules that require querying or reasoning about the **target Salesforce org**, such as:

* Existing fields with the same API name
* Immutable metadata after creation
* Managed package locks
* Namespace collisions
* Existing data that blocks destructive changes

These rules are **runtime validations**, not schema validations.

---

## Salesforce Documentation Requirement

If a metadata tag has a **restricted or enumerated set of valid values** (for example:
`<formulaTreatBlanksAs>BlankAsZero</formulaTreatBlanksAs>`):

You must:

1. Identify the valid options supported by Salesforce
2. Explain what each option means
3. Document which field types support each option
4. Include these constraints in the appropriate validation level

If Salesforce behavior is ambiguous, document the **most restrictive safe assumption**.

---

## Json Shape Generation

Create a section titled "## Json Shape" before the validation rules section . 
In this section:

1. Represent the **field definition as a JSON object**.
2. Format the JSON using 2-space indentation and wrap it in a Markdown code block with ```json.
3. Only include relevant metadata from the XML (do not invent keys).
4. Ensure the JSON reflects the **core intent fields** (the ones generated by the LLM) rather than system-injected or UI fields.

Example:

```json
{ 
  type: "AutoNumber",
  label: "Asset ID",
  fullName: "Asset_ID__c",
  displayFormat: "ASSET-{YYYY}-{0000}",
  description: "Automatically generated identifier for each asset record.",
  inlineHelpText: "Example: ASSET-2026-0001",
  startingNumber: 1
}

## Writing Style & Precision Rules

* Use **clear, declarative language**
* Avoid speculation — prefer Salesforce-documented behavior
* Use bullet points for validation rules
* Be precise and implementation-oriented
* Write as if this document will be used to generate code

---

## Output Constraints

* Output **only Markdown**
* Do **not** include explanations of your reasoning process
* Do **not** reference this prompt in the output
* Do **not** invent metadata that does not exist in the input XML

---

*Example Output:*
```md
# Field Documentation: Auto Number

This document breaks down the Salesforce **AutoNumber Custom Field XML** and separates the metadata into categories based on how the transpiler, LLM, and UI will interact with them.

---

Stored in `FieldName__c.field-meta.xml`.

## 1. The Outer Container

This wraps the field definition in Salesforce Source Format (SFDX).


<?xml version="1.0" encoding="UTF-8"?>
<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
    <!-- Field content goes here -->
</CustomField>


---

## 2. Core Field Configuration (LLM Generated)

These are the primary intent fields. The LLM must decide these to define the business logic and identity of the auto-number sequence.


<fullName>AutoNumber__c</fullName>
<label>AutoNumber</label>
<displayFormat>ASSET-{YYYY}-{MM}-{00000}</displayFormat>
<description>Unique identifier for global company assets, tracking the year and month of creation.</description>
<inlineHelpText>This ID is generated automatically. Format: ASSET-YEAR-MONTH-NUMBER</inlineHelpText>
<startingNumber>1</startingNumber>


---

## 3. Supporting Features (React Flow UI)

These fields are not generated by the LLM by default. They are provided as defaults by the Zod schema but are displayed in the React Flow interface in case the user wants to toggle specific platform behaviors.


<externalId>false</externalId>
<trackHistory>false</trackHistory>


---

## 4. Others (Transpiler Injected)

These fields are considered platform-required metadata and are automatically added by the transpiler. They ensure the XML is valid for the Salesforce Metadata API but do not require input from the LLM or the end-user.


<type>AutoNumber</type>
<trackTrending>false</trackTrending>

---
## Json Shape

This section represents the core field definition as a JSON object.

json
 {
    type: "AutoNumber",
    label: "Asset ID",
    fullName: "Asset_ID__c",
    displayFormat: "ASSET-{YYYY}-{0000}",
    description: "Automatically generated identifier for each asset record.",
    inlineHelpText: "Example: ASSET-2026-0001",
    startingNumber: 1
  }

---

## 5. Validation Rules

This section documents the validation rules applied to **AutoNumber** fields at each validation layer in the transpiler pipeline.

### Level 1: Structural Validation (The Shape)

Ensures the JSON matches the AutoNumber field schema.

* `type` must be exactly `AutoNumber`.
* `label` must be a non-empty string.
* `fullName` must be a valid Salesforce custom field API name ending in `__c`.
* `startingNumber`, if provided, must be a number.

---

### Level 2: Logical Validation (The Context)

Ensures internal consistency and field dependencies.

* `displayFormat` is **required** for AutoNumber fields.
* `startingNumber` must be greater than or equal to `0`.
* `externalId` must be `false` (AutoNumber fields cannot be External IDs).

---

### Level 3: Platform Constraints (The Linter)

Enforces hard Salesforce platform rules that are not reliably expressible in Zod schemas and must be checked via custom logic.

* `fullName` (API name, excluding `__c`) must not exceed **40 characters**.
* `label` must not exceed **40 characters**.
* `displayFormat` must not exceed **255 characters**.
* `displayFormat` must contain **at least one numeric placeholder** (`{0}`, `{00}`, `{000}`, etc.).
* Date tokens in `displayFormat` are restricted to supported Salesforce placeholders (`{YYYY}`, `{YY}`, `{MM}`, `{DD}`).
* AutoNumber fields **cannot be encrypted** or marked as unique.
* AutoNumber fields cannot be used as **lookup filters** or **external identifiers**.

Violations at this level should fail fast with actionable error messages before packaging.

---

### Level 4: State & Conflict Validation (The Pre-Flight)

An optional runtime validation layer that inspects the target Salesforce org before deployment.

* Verify that no existing field with the same `fullName` already exists on the target object.
* If a field exists:

  * Prevent changes to `type` (AutoNumber → other types is illegal).
  * Prevent changes to `displayFormat` on existing AutoNumber fields.
  * Prevent changes to `startingNumber` if records already exist.
* Validate that the target object is **not managed-package locked**.
* Detect namespace collisions in namespaced orgs.

Failures at this level should be surfaced as **pre-deployment conflicts**, not schema errors.

---

## 6. Summary Table for Transpiler Logic

| XML Tag            | JSON Key       | Source | Default Value      |
| ------------------ | -------------- | ------ | ------------------ |
| `<fullName>`       | fullName       | LLM    | Derived from Label |
| `<label>`          | label          | LLM    | N/A                |
| `<displayFormat>`  | displayFormat  | LLM    | `{0000}`           |
| `<startingNumber>` | startingNumber | LLM    | 1                  |
| `<description>`    | description    | LLM    | Empty String       |
| `<inlineHelpText>` | inlineHelpText      | LLM    | Empty String       |
| `<externalId>`     | externalId     | UI     | false              |
| `<trackHistory>`   | trackHistory   | UI     | false              |
| `<type>`           | type           | System | AutoNumber         |
| `<trackTrending>`  | N/A            | System | false              |
```

Tell me you understand and I will go ahead and paste the xml please write on canvas
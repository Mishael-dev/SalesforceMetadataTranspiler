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

## 5. Summary Table for Transpiler Logic

| XML Tag                  | JSON Key    | Source     | Default Value      |
| ------------------------ | ----------- | ---------- | ------------------ |
| `<fullName>`             | fullName    | LLM        | Derived from Label |
| `<label>`                | label       | LLM        | N/A                |
| `<formula>`              | formula     | LLM        | N/A                |
| `<type>`                 | returnType  | LLM        | Text               |
| `<formulaTreatBlanksAs>` | blankOption | LLM/System | BlankAsZero        |
| `<description>`          | description | LLM        | Empty String       |
| `<inlineHelpText>`       | helpText    | LLM        | Empty String       |
| `<externalId>`           | externalId  | UI         | false              |
| `<required>`             | required    | UI         | false              |
| `<unique>`               | unique      | UI         | false              |
| `<trackTrending>`        | N/A         | System     | false              |

# 🛡️ Salesforce Metadata Validation

This document describes the multi-layered validation system used in the Salesforce Metadata Transpiler. The validations ensure that incoming JSON is correct, logically consistent, and compatible with Salesforce platform constraints before generating XML and deploying metadata.

---

## Validation Levels

### Level 1: Structural Validation (The Shape)

Ensures the JSON matches the schema interface (types, required fields, and enums) using Zod.

### Level 2: Logical Validation (The Context)

Checks internal consistency and field dependencies (e.g., if type is AutoNumber, then displayFormat must exist) using Zod refinements.

### Level 3: Platform Constraints (The Linter)

Enforces hard Salesforce platform limits that are too complex for Zod, such as API name length limits (40 chars) or the maximum number of Master-Detail fields (2 per object).

### Level 4: State & Conflict (The Pre-Flight)

An optional layer that queries the target Salesforce Org via API to check for existing metadata conflicts, such as duplicate API na

## Class Diagram and Configuration


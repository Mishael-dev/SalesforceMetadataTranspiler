# 📁 File Structure — Salesforce Metadata Transpiler

This document describes the organization of the **source code** for the Salesforce Metadata Transpiler. Understanding this layout helps contributors navigate the codebase and know where to add new features or metadata types.

---

## 📂 src/

The `src` folder contains all the core application logic and types.

```
src/
├── schemas/
│   ├── customObjects/
│   │   ├── fields/
│   │   │   ├── autoNumber.ts        # Field schema definition for AutoNumber fields
│   │   │   ├── formula.ts           # Field schema definition for Formula fields
│   │   │   └── index.ts             # Exports all field schemas for CustomObjects
│   │   ├── index.ts                  # Exports all custom object schemas
│   │   └── object.ts                 # Core schema for CustomObject
│   └── index.ts                      # Exports all top-level schemas
├── types/
│   ├── transpilerConfig/
│   │   ├── index.ts                  # Exports config types
│   │   └── transpilerConfig.ts       # Type definitions for Transpiler configuration
│   └── validationResult/
│       ├── index.ts                  # Exports validation result types
│       └── validationResult.ts       # Type definitions for validation outputs
├── validator/
│   ├── 1-structuralValidator/
│   │   ├── index.ts                  # Exports structural validator
│   │   └── structural.validator.ts   # Handles schema-level validation using Zod
│   ├── index.ts                      # Exports all validators
│   └── validator.ts                  # Core validator orchestrator
├── run.ts                            # Entry point for running the transpiler
└── salesforceMetadataTranspiler.ts   # Main class handling metadata transpilation
```

---

### Folder Responsibilities

* **schemas/** — Contains all Zod schema definitions for validating incoming JSON. `customObjects/` defines object-level schemas and their fields.
* **types/** — TypeScript type definitions used across the application for config and validation results.
* **validator/** — Implements all validation logic, including structural (schema), logical (field dependencies), and other rules.
* **run.ts** — The CLI or programmatic entry point for executing the transpiler.
* **salesforceMetadataTranspiler.ts** — Main orchestrator class that ties together validation, XML generation, filesystem mapping, and packaging.

This structure is designed for **modularity**, **scalability**, and **easy extension**, allowing contributors to add new schemas, validators, or metadata types without modifying core logic.

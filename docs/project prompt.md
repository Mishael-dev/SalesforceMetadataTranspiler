# Salesforce Metadata Transpiler - Project Specification

## Project Overview

A TypeScript-based transpiler that converts JSON schema definitions into Salesforce metadata XML deployment packages. The transpiler validates input schemas, converts them to Salesforce-compatible XML files, organizes them in the correct directory structure, and packages everything into a deployable ZIP file.

---

## Input and Output

### Input: JSON Schema
The transpiler accepts an array of custom object definitions in JSON format:

```json
[{
  "fullName": "Project__c",
  "label": "Project",
  "pluralLabel": "Projects",
  "deploymentStatus": "Deployed",
  "sharingModel": "ReadWrite",
  "features": {
    "enableActivities": true,
    "enableReports": true,
    "enableSearch": true,
    "enableHistory": true,
    "enableFeeds": true,
    "enableBulkApi": true,
    "enableSharing": true,
    "enableStreamingApi": true
  },
  "nameField": {
    "type": "Text",
    "label": "Project Name"
  },
  "fields": [
    {
      "fullName": "Status__c",
      "label": "Status",
      "type": "Picklist",
      "valueSet": {
        "definition": [
          { "fullName": "New", "label": "New", "default": true },
          { "fullName": "InProgress", "label": "In Progress" },
          { "fullName": "Completed", "label": "Completed" }
        ]
      }
    }
    // ... more fields
  ]
}]
```

### Output: Metadata Deployment Package

**Directory Structure:**
```
📦 objects/
 ┣ 📂 project__c/
 ┃ ┣ 📂 fields/
 ┃ ┃ ┣ 📜 Status__c.field-meta.xml
 ┃ ┃ ┗ 📜 Description__c.field-meta.xml
 ┃ ┗ 📜 project__c.object-meta.xml
 ┣ 📂 project_task__c/
 ┃ ┣ 📂 fields/
 ┃ ┃ ┣ 📜 Project__c.field-meta.xml
 ┃ ┃ ┗ 📜 Priority__c.field-meta.xml
 ┃ ┗ 📜 project_task__c.object-meta.xml
 ┗ 📜 package.xml
```

**Object Metadata XML (`project__c.object-meta.xml`):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">
    <actionOverrides>
        <actionName>Accept</actionName>
        <type>Default</type>
    </actionOverrides>
    <!-- More action overrides for different actions and form factors -->
    <allowInChatterGroups>false</allowInChatterGroups>
    <compactLayoutAssignment>SYSTEM</compactLayoutAssignment>
    <deploymentStatus>Deployed</deploymentStatus>
    <description>the project object</description>
    <enableActivities>true</enableActivities>
    <enableBulkApi>true</enableBulkApi>
    <enableFeeds>false</enableFeeds>
    <enableHistory>false</enableHistory>
    <enableReports>true</enableReports>
    <enableSearch>true</enableSearch>
    <enableSharing>true</enableSharing>
    <enableStreamingApi>true</enableStreamingApi>
    <label>project</label>
    <nameField>
        <label>project Name</label>
        <type>Text</type>
    </nameField>
    <pluralLabel>projects</pluralLabel>
    <sharingModel>ReadWrite</sharingModel>
    <visibility>Public</visibility>
</CustomObject>
```

**Field Metadata XML (`Status__c.field-meta.xml`):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>Status__c</fullName>
    <description>the project status</description>
    <label>Status</label>
    <required>false</required>
    <trackTrending>false</trackTrending>
    <type>Picklist</type>
    <valueSet>
        <restricted>true</restricted>
        <valueSetDefinition>
            <sorted>false</sorted>
            <value>
                <fullName>New</fullName>
                <default>false</default>
                <label>New</label>
            </value>
            <value>
                <fullName>In Progress</fullName>
                <default>false</default>
                <label>In Progress</label>
            </value>
            <value>
                <fullName>Completed</fullName>
                <default>false</default>
                <label>Completed</label>
            </value>
        </valueSetDefinition>
    </valueSet>
</CustomField>
```

---

## Project Architecture

### High-Level Component Flow

```
JSON Input
    ↓
SchemaValidator (Zod validation + business rules)
    ↓
MetadataConverter (JSON → Internal metadata structure)
    ↓
XMLGenerator (Metadata → XML strings)
    ↓
FileSystemGenerator (Organize XML into folder structure)
    ↓
PackageBuilder (Create package.xml + ZIP file)
    ↓
Deployment Package (.zip)
```

### Directory Structure

```
📂 modules/
┗ 📂 salesforce-transpiler/
  ┣ 📂 src/
  ┃ ┣ 📂 schemas/            # Component 1: SchemaValidator
  ┃ ┃ ┣ 📜 SchemaValidator.ts # Main validation class
  ┃ ┃ ┣ 📜 zodDefinitions.ts  # Zod schema definitions
  ┃ ┃ ┗ 📜 metadataTypes.ts   # TypeScript interfaces
  ┃ ┃
  ┃ ┣ 📂 converters/         # Component 2: MetadataConverter
  ┃ ┃ ┣ 📜 MetadataConverter.ts
  ┃ ┃ ┣ 📜 FieldConverterFactory.ts
  ┃ ┃ ┣ 📜 BaseFieldConverter.ts
  ┃ ┃ ┗ 📜 FieldConverters.ts
  ┃ ┃
  ┃ ┣ 📂 generators/         # Component 3: XMLGenerator & FileSystemGenerator
  ┃ ┃ ┣ 📜 FileSystemGenerator.ts
  ┃ ┃ ┣ 📜 ObjectXMLGenerator.ts
  ┃ ┃ ┣ 📜 BaseFieldXMLGenerator.ts
  ┃ ┃ ┗ 📜 FieldXMLGenerators.ts
  ┃ ┃
  ┃ ┣ 📂 utils/              # Component 4: PackageBuilder
  ┃ ┃ ┣ 📜 PackageBuilder.ts
  ┃ ┃ ┣ 📜 ZipBuilder.ts
  ┃ ┃ ┗ 📜 XMLBuilder.ts
  ┃ ┃
  ┃ ┗ 📜 index.ts            # Main orchestrator
  ┃
  ┣ 📂 tests/
  ┃ ┣ 📜 validator.test.ts
  ┃ ┣ 📜 converter.test.ts
  ┃ ┗ 📜 generator.test.ts
  ┣ 📜 package.json
  ┗ 📜 tsconfig.json
```

---

## Component Details

### 1. SchemaValidator (`src/schemas/`)

**Purpose:** Validates incoming JSON against Zod schemas and applies Salesforce business rules.

**Files:**
- `metadataTypes.ts` - TypeScript interfaces for all metadata types
- `zodDefinitions.ts` - Zod schema definitions for validation
- `SchemaValidator.ts` - Main validation class

**Key Responsibilities:**
1. **Zod Schema Validation**: Validate JSON structure, types, and constraints
2. **Business Rules Validation**:
   - Naming conventions (40 char limit, proper suffixes)
   - Field dependencies (e.g., `trackHistory` requires `enableHistory`)
   - Enterprise features (Bulk API, Sharing, Streaming API must be enabled together)
   - Master-Detail requirements (`sharingModel` must be `ControlledByParent`)
   - Junction object rules (exactly 2 Master-Detail fields with orders 0 and 1)
   - Roll-Up Summary requirements (needs Master-Detail relationship)
3. **Cross-Object Validation**: Verify relationship references exist

**Validation Result:**
```typescript
interface ValidatedSchema {
  objects: CustomObjectSchema[];
  errors: ValidationError[];
  warnings: ValidationError[];
  isValid: boolean;
}
```

### 2. MetadataConverter (`src/converters/`)

**Purpose:** Converts validated JSON to internal metadata representation using the Strategy Pattern.

**Files:**
- `MetadataConverter.ts` - Main converter orchestrator
- `FieldConverterFactory.ts` - Factory for field converters
- `BaseFieldConverter.ts` - Abstract base class
- `FieldConverters.ts` - Concrete field converters (Text, Picklist, Lookup, etc.)

**Key Classes:**
- `MetadataConverter`: Orchestrates conversion process
- `ObjectMetadataConverter`: Converts object-level properties
- `FieldConverterFactory`: Creates appropriate field converter based on type
- `BaseFieldConverter`: Abstract class with `convertCommonFields()` method
- Concrete converters: `TextFieldConverter`, `PicklistFieldConverter`, `LookupFieldConverter`, etc.

**Pattern:**
```typescript
private convertFields(fields: Field[]): FieldMetadata[] {
  return fields.map(field => {
    const converter = this.fieldConverters.get(field.type);
    return converter.convert(field);
  });
}
```

**Supported Field Types:**
- Text, LongTextArea, RichTextArea
- Picklist, MultiselectPicklist
- Checkbox, Number, Date, DateTime, Time
- Email, Phone, URL
- Currency, Percent
- Lookup, MasterDetail, ExternalLookup, IndirectLookup
- Formula, Summary, AutoNumber
- Location, EncryptedText
- Hierarchy, MetadataRelationship

### 3. XMLGenerator & FileSystemGenerator (`src/generators/`)

**Purpose:** Generates Salesforce-compliant XML and organizes files into proper structure.

**Files:**
- `FileSystemGenerator.ts` - Creates folder/file structure
- `ObjectXMLGenerator.ts` - Generates object-meta.xml files
- `BaseFieldXMLGenerator.ts` - Abstract base for field XML generation
- `FieldXMLGenerators.ts` - Concrete XML generators for each field type

**Key Responsibilities:**

**ObjectXMLGenerator:**
- Generate action overrides (Accept, Clone, Delete, Edit, List, New, SaveEdit, Tab, View)
- Each action has 3 form factors: Default, Large (Lightning), Small (Mobile)
- Include all object properties (deployment status, features, nameField, etc.)

**FieldXMLGenerators:**
- Each field type has specific XML structure
- Common fields: fullName, label, required, trackTrending, type, description
- Type-specific fields (e.g., Picklist needs valueSet, Lookup needs referenceTo)

**FileSystemGenerator:**
- Creates in-memory folder structure
- Object folders named with lowercase API name (e.g., `project__c/`)
- Fields subfolder for all field XML files
- Proper naming: `{fieldName}.field-meta.xml`, `{objectName}.object-meta.xml`

### 4. PackageBuilder (`src/utils/`)

**Purpose:** Creates package.xml manifest and ZIP deployment package.

**Files:**
- `PackageBuilder.ts` - Main packaging orchestrator
- `ZipBuilder.ts` - JSZip wrapper
- `XMLBuilder.ts` - fast-xml-parser configuration

**Key Responsibilities:**
1. Generate `package.xml` with proper structure:
   ```xml
   <Package xmlns="http://soap.sforce.com/2006/04/metadata">
       <types>
           <members>*</members>
           <name>CustomObject</name>
       </types>
       <types>
           <members>Project__c.Status__c</members>
           <members>Project__c.Description__c</members>
           <name>CustomField</name>
       </types>
       <version>61.0</version>
   </Package>
   ```
2. Create temporary directory
3. Write all XML files to disk
4. ZIP the directory
5. Clean up temporary files
6. Return path to ZIP file

### 5. Main Orchestrator (`src/index.ts`)

**Purpose:** Coordinates all components and exposes the main API.

**Main Class:**
```typescript
class SalesforceMetadataTranspiler {
  private validator: SchemaValidator;
  private converter: MetadataConverter;
  private fileGenerator: FileSystemGenerator;
  private packageBuilder: PackageBuilder;
  
  constructor(config: TranspilerConfig);
  async transpile(jsonSchema: CustomObjectSchema[]): Promise<TranspileResult>;
}
```

**Configuration:**
```typescript
interface TranspilerConfig {
  apiVersion: string;           // Default: '61.0'
  outputDirectory?: string;     // Where to save ZIP
  validateOnly?: boolean;       // Only validate, don't generate
  includeActionOverrides?: boolean; // Include action overrides in XML
  strictMode?: boolean;         // Fail on warnings
}
```

**Result:**
```typescript
interface TranspileResult {
  success: boolean;
  zipPath?: string;
  metadata: MetadataStructure;
  errors: ValidationError[];
  warnings: ValidationError[];
}
```

---

## Design Patterns Used

### 1. Strategy Pattern
Used for field conversion and XML generation. Each field type has its own converter/generator.

**Benefits:**
- Easy to add new field types
- Each converter/generator is independent and testable
- No giant if-else chains

### 2. Factory Pattern
`FieldConverterFactory` and `FieldXMLGeneratorFactory` create appropriate converters/generators based on field type.

### 3. Builder Pattern
XML is built incrementally using object structures that are converted to XML strings.

### 4. Facade Pattern
`SalesforceMetadataTranspiler` provides a simple interface to complex subsystem.

---

## Key Salesforce Metadata Rules

### Object-Level Rules
1. **API Names**: Must end with `__c`, max 40 characters
2. **Enterprise Features**: `enableBulkApi`, `enableSharing`, `enableStreamingApi` must all be enabled together
3. **Sharing Model**: Master-Detail child objects must have `ControlledByParent`
4. **Name Field**: Required, can be Text or AutoNumber

### Field-Level Rules
1. **API Names**: Must end with `__c`, max 40 characters
2. **History Tracking**: `trackHistory=true` requires object `enableHistory=true`
3. **Feed Tracking**: `trackFeedHistory=true` requires object `enableFeeds=true`
4. **Master-Detail**:
   - Child object must have `sharingModel='ControlledByParent'`
   - Junction objects need exactly 2 MD fields with `relationshipOrder` 0 and 1
   - Cannot have `defaultValue`
5. **Lookup**: Cannot have `defaultValue`
6. **Roll-Up Summary**:
   - Only on objects with Master-Detail relationships
   - `summarizedField` required unless `summaryOperation='COUNT'`
   - `summaryForeignKey` is the MD field name on child object
7. **IndirectLookup**: `referenceTargetField` must be unique external ID on parent
8. **Number/Currency/Percent**: `scale` must be ≤ `precision`
9. **Text**: Max length 255
10. **LongTextArea/RichTextArea**: Max length 131,072
11. **EncryptedText**: Max length 175

### Action Overrides
Every object needs action overrides for:
- Actions: Accept, CancelEdit, Clone, Delete, Edit, List, New, SaveEdit, Tab, View
- Form Factors: Default (no formFactor), Large (Lightning), Small (Mobile)
- Type: Default (standard behavior)

---

## Dependencies

### Required npm Packages
```json
{
  "dependencies": {
    "zod": "^3.22.4",           // Schema validation
    "fast-xml-parser": "^4.3.2", // XML generation/parsing
    "jszip": "^3.10.1"           // ZIP file creation
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.10.6",
    "vitest": "^1.1.0"           // Testing framework
  }
}
```

---

## Usage Example

```typescript
import { SalesforceMetadataTranspiler } from './src';
import * as fs from 'fs';

// Initialize transpiler
const transpiler = new SalesforceMetadataTranspiler({
  apiVersion: '61.0',
  outputDirectory: './output',
  strictMode: true
});

// Load JSON schema
const jsonSchema = JSON.parse(
  fs.readFileSync('./schema.json', 'utf-8')
);

// Transpile
const result = await transpiler.transpile(jsonSchema);

if (result.success) {
  console.log(`✅ Deployment package created: ${result.zipPath}`);
  
  if (result.warnings.length > 0) {
    console.warn('⚠️ Warnings:', result.warnings);
  }
} else {
  console.error('❌ Transpilation failed:');
  result.errors.forEach(err => {
    console.error(`  - ${err.message}`);
  });
}
```

---

## Testing Strategy

### Unit Tests
- **SchemaValidator**: Test each validation rule independently
- **Field Converters**: Test each field type conversion
- **XML Generators**: Verify XML structure matches Salesforce format
- **Package Builder**: Test file structure and package.xml generation

### Integration Tests
- End-to-end transpilation with sample schemas
- Validate generated XML against Salesforce metadata format
- Test error handling and edge cases

### Test Files
- `tests/validator.test.ts` - SchemaValidator tests
- `tests/converter.test.ts` - MetadataConverter tests
- `tests/generator.test.ts` - XMLGenerator tests

---

## Current Task: Build SchemaValidator

**Implementation Files:**
1. `src/schemas/metadataTypes.ts` - TypeScript interfaces
2. `src/schemas/zodDefinitions.ts` - Zod schemas
3. `src/schemas/SchemaValidator.ts` - Validation class

**Validation Steps:**
1. Parse JSON with Zod schemas (structure, types, constraints)
2. Validate naming conventions (length, suffixes, duplicates)
3. Validate object features (enterprise features grouping)
4. Validate field dependencies (tracking, Master-Detail rules, etc.)
5. Validate cross-object relationships
6. Return `ValidatedSchema` with errors and warnings

**Success Criteria:**
- All Zod schemas compile without errors
- SchemaValidator class validates the provided example JSON successfully
- Business rules are properly enforced
- Clear error messages with object/field context
- Warnings don't block validation but are reported

---

## Notes for Implementation

1. **Type Safety**: Use TypeScript discriminated unions for field types
2. **Error Messages**: Include object name, field name, and clear descriptions
3. **Extensibility**: Easy to add new field types or validation rules
4. **Performance**: Validation should be fast (< 1 second for 100 objects)
5. **XML Format**: Must exactly match Salesforce metadata API format
6. **File Names**: Lowercase for object folders, preserve case for field files
7. **Action Overrides**: Generate all 30 action overrides (10 actions × 3 form factors)

---

## Success Metrics

- ✅ Validates complex schemas with 20+ field types
- ✅ Generates valid Salesforce metadata XML
- ✅ Creates properly structured deployment package
- ✅ Handles all Salesforce business rules
- ✅ Clear error/warning messages
- ✅ Fast performance (< 5 seconds for 50 objects)
- ✅ 90%+ test coverage
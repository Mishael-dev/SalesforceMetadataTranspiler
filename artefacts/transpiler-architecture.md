# Salesforce Metadata Transpiler Architecture

## Overview
A class-based transpiler that converts JSON schema definitions to Salesforce metadata XML deployment packages.

---

## Core Architecture

### 1. **Main Transpiler Class**
The orchestrator that manages the entire conversion and packaging process.

```typescript
class SalesforceMetadataTranspiler {
  private validator: SchemaValidator;
  private converter: MetadataConverter;
  private fileGenerator: FileSystemGenerator;
  private packageBuilder: PackageBuilder;
  
  constructor(config: TranspilerConfig) {
    this.validator = new SchemaValidator();
    this.converter = new MetadataConverter();
    this.fileGenerator = new FileSystemGenerator();
    this.packageBuilder = new PackageBuilder();
  }
  
  async transpile(jsonSchema: CustomObjectSchema[]): Promise<TranspileResult> {
    // 1. Validate JSON schema
    const validatedSchema = this.validator.validate(jsonSchema);
    
    // 2. Convert to metadata structure
    const metadata = this.converter.convert(validatedSchema);
    
    // 3. Generate file system structure
    const fileStructure = this.fileGenerator.generate(metadata);
    
    // 4. Create package.xml and zip
    const zipFile = await this.packageBuilder.build(fileStructure);
    
    return {
      success: true,
      zipPath: zipFile,
      metadata: metadata,
      warnings: []
    };
  }
}
```

---

## Component Classes

### 2. **SchemaValidator**

```txt
Validation Levels


```
Validates incoming JSON against Zod schemas and business rules.

```typescript
class SchemaValidator {
  private customObjectSchema: ZodSchema;
  private fieldSchemas: Map<FieldType, ZodSchema>;
  
  validate(jsonSchema: any[]): ValidatedSchema {
    // Validate overall structure
    // Validate each custom object
    // Validate field dependencies (e.g., Master-Detail requires ControlledByParent)
    // Check cross-object relationships
    // Validate naming conventions
    
    return {
      objects: validatedObjects,
      errors: [],
      warnings: []
    };
  }
  
  private validateFieldDependencies(field: Field, object: CustomObject): ValidationResult {}
  private validateRelationships(objects: CustomObject[]): ValidationResult {}
  private validateNamingConventions(name: string): ValidationResult {}
}
```
---

### 4. **XMLGenerator**
Generates XML strings from metadata structures.

```typescript
class XMLGenerator {
  private objectXMLGenerator: ObjectXMLGenerator;
  private fieldXMLGenerators: Map<FieldType, FieldXMLGenerator>;
  
  generateObjectXML(objectMetadata: ObjectMetadata): string {
    return this.objectXMLGenerator.generate(objectMetadata);
  }
  
  generateFieldXML(fieldMetadata: FieldMetadata): string {
    const generator = this.fieldXMLGenerators.get(fieldMetadata.type);
    return generator.generate(fieldMetadata);
  }
}
```

#### **4a. ObjectXMLGenerator**
Generates the object-meta.xml file.

```typescript
class ObjectXMLGenerator {
  generate(metadata: ObjectMetadata): string {
    const xmlBuilder = new XMLBuilder({
      ignoreAttributes: false,
      format: true
    });
    
    const objectXML = {
      '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
      CustomObject: {
        '@_xmlns': 'http://soap.sforce.com/2006/04/metadata',
        ...this.buildActionOverrides(),
        allowInChatterGroups: metadata.features.allowInChatterGroups,
        compactLayoutAssignment: 'SYSTEM',
        deploymentStatus: metadata.deploymentStatus,
        description: metadata.description,
        enableActivities: metadata.features.enableActivities,
        enableBulkApi: metadata.features.enableBulkApi,
        enableFeeds: metadata.features.enableFeeds,
        enableHistory: metadata.features.enableHistory,
        enableReports: metadata.features.enableReports,
        enableSearch: metadata.features.enableSearch,
        enableSharing: metadata.features.enableSharing,
        enableStreamingApi: metadata.features.enableStreamingApi,
        label: metadata.label,
        nameField: this.buildNameField(metadata.nameField),
        pluralLabel: metadata.pluralLabel,
        sharingModel: metadata.sharingModel,
        visibility: 'Public'
      }
    };
    
    return xmlBuilder.build(objectXML);
  }
  
  private buildActionOverrides(): any {}
  private buildNameField(nameField: NameFieldMetadata): any {}
}
```

#### **4b. FieldXMLGenerator (Abstract Base)**
Abstract base class for field XML generation.

```typescript
abstract class FieldXMLGenerator {
  abstract generate(metadata: FieldMetadata): string;
  
  protected buildCommonXML(metadata: FieldMetadata): any {
    return {
      '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
      CustomField: {
        '@_xmlns': 'http://soap.sforce.com/2006/04/metadata',
        fullName: metadata.fullName,
        description: metadata.description,
        label: metadata.label,
        required: metadata.required,
        trackTrending: metadata.trackTrending || false,
        type: metadata.type
      }
    };
  }
}

// Concrete implementations
class TextFieldXMLGenerator extends FieldXMLGenerator {
  generate(metadata: TextFieldMetadata): string {
    const xmlBuilder = new XMLBuilder({ format: true });
    const baseXML = this.buildCommonXML(metadata);
    
    baseXML.CustomField.length = metadata.length;
    
    return xmlBuilder.build(baseXML);
  }
}

class PicklistFieldXMLGenerator extends FieldXMLGenerator {
  generate(metadata: PicklistFieldMetadata): string {
    const xmlBuilder = new XMLBuilder({ format: true });
    const baseXML = this.buildCommonXML(metadata);
    
    baseXML.CustomField.valueSet = {
      restricted: true,
      valueSetDefinition: {
        sorted: false,
        value: metadata.valueSet.definition.map(v => ({
          fullName: v.fullName,
          default: v.default || false,
          label: v.label
        }))
      }
    };
    
    return xmlBuilder.build(baseXML);
  }
}

class LookupFieldXMLGenerator extends FieldXMLGenerator {
  generate(metadata: LookupFieldMetadata): string {
    const xmlBuilder = new XMLBuilder({ format: true });
    const baseXML = this.buildCommonXML(metadata);
    
    baseXML.CustomField.deleteConstraint = metadata.deleteConstraint;
    baseXML.CustomField.referenceTo = metadata.referenceTo;
    baseXML.CustomField.relationshipLabel = metadata.relationshipLabel;
    baseXML.CustomField.relationshipName = metadata.relationshipName;
    
    return xmlBuilder.build(baseXML);
  }
}

// ... More field XML generators
```

---

### 5. **FileSystemGenerator**
Creates the folder structure and file contents.

```typescript
class FileSystemGenerator {
  private xmlGenerator: XMLGenerator;
  
  generate(metadata: MetadataStructure): FileStructure {
    const fileStructure = new FileStructure();
    
    for (const objMetadata of metadata.objects) {
      const objectFolder = this.createObjectFolder(objMetadata);
      fileStructure.addFolder(objectFolder);
    }
    
    return fileStructure;
  }
  
  private createObjectFolder(objMetadata: ObjectWithFields): Folder {
    const folderName = objMetadata.objectMetadata.fullName.toLowerCase();
    const folder = new Folder(folderName);
    
    // Add object-meta.xml
    const objectXML = this.xmlGenerator.generateObjectXML(objMetadata.objectMetadata);
    folder.addFile(`${folderName}.object-meta.xml`, objectXML);
    
    // Create fields subfolder
    const fieldsFolder = new Folder('fields');
    for (const fieldMetadata of objMetadata.fieldMetadata) {
      const fieldXML = this.xmlGenerator.generateFieldXML(fieldMetadata);
      fieldsFolder.addFile(`${fieldMetadata.fullName}.field-meta.xml`, fieldXML);
    }
    folder.addSubfolder(fieldsFolder);
    
    return folder;
  }
}
```

---

### 6. **PackageBuilder**
Creates the package.xml manifest and zips the deployment package.

```typescript
class PackageBuilder {
  async build(fileStructure: FileStructure): Promise<string> {
    // 1. Generate package.xml
    const packageXML = this.generatePackageXML(fileStructure);
    
    // 2. Create temp directory
    const tempDir = await this.createTempDirectory();
    
    // 3. Write all files to temp directory
    await this.writeFilesToDisk(tempDir, fileStructure);
    await this.writePackageXML(tempDir, packageXML);
    
    // 4. Zip the directory
    const zipPath = await this.zipDirectory(tempDir);
    
    // 5. Cleanup temp directory
    await this.cleanup(tempDir);
    
    return zipPath;
  }
  
  private generatePackageXML(fileStructure: FileStructure): string {
    const customObjects = fileStructure.getCustomObjects();
    
    const packageXML = {
      '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
      Package: {
        '@_xmlns': 'http://soap.sforce.com/2006/04/metadata',
        types: [
          {
            members: '*',
            name: 'CustomObject'
          },
          {
            members: customObjects.map(obj => obj.fullName),
            name: 'CustomField'
          }
        ],
        version: '61.0'
      }
    };
    
    return new XMLBuilder({ format: true }).build(packageXML);
  }
  
  private async zipDirectory(dirPath: string): Promise<string> {
    // Use JSZip or similar library
  }
}
```

---

## Supporting Classes

### 7. **FileStructure**
Represents the in-memory file/folder structure.

```typescript
class FileStructure {
  private folders: Map<string, Folder> = new Map();
  
  addFolder(folder: Folder): void {
    this.folders.set(folder.name, folder);
  }
  
  getCustomObjects(): ObjectMetadata[] {
    // Extract all custom objects from folders
  }
  
  toJSON(): any {
    // Convert to JSON representation for debugging
  }
}

class Folder {
  name: string;
  files: Map<string, string> = new Map();
  subfolders: Map<string, Folder> = new Map();
  
  constructor(name: string) {
    this.name = name;
  }
  
  addFile(filename: string, content: string): void {
    this.files.set(filename, content);
  }
  
  addSubfolder(folder: Folder): void {
    this.subfolders.set(folder.name, folder);
  }
}
```

---

### 8. **Configuration Classes**

```typescript
interface TranspilerConfig {
  apiVersion: string;
  outputDirectory?: string;
  validateOnly?: boolean;
  includeActionOverrides?: boolean;
  strictMode?: boolean;
}

interface TranspileResult {
  success: boolean;
  zipPath?: string;
  metadata: MetadataStructure;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  code: string;
  message: string;
  objectName?: string;
  fieldName?: string;
  severity: 'error' | 'warning';
}
```

---

## Data Flow

```
JSON Schema Input
      ↓
SchemaValidator (Zod validation + business rules)
      ↓
MetadataConverter (JSON → Internal Metadata)
      ↓
XMLGenerator (Metadata → XML strings)
      ↓
FileSystemGenerator (Create folder structure)
      ↓
PackageBuilder (Generate package.xml + zip)
      ↓
Deployment Package (.zip)
```

---

## Factory Pattern for Field Converters

```typescript
class FieldConverterFactory {
  private converters: Map<FieldType, FieldMetadataConverter> = new Map();
  
  constructor() {
    this.registerConverters();
  }
  
  private registerConverters(): void {
    this.converters.set('Text', new TextFieldConverter());
    this.converters.set('LongTextArea', new LongTextAreaFieldConverter());
    this.converters.set('RichTextArea', new RichTextAreaFieldConverter());
    this.converters.set('Picklist', new PicklistFieldConverter());
    this.converters.set('MultiselectPicklist', new MultiselectPicklistFieldConverter());
    this.converters.set('Checkbox', new CheckboxFieldConverter());
    this.converters.set('Number', new NumberFieldConverter());
    this.converters.set('Date', new DateFieldConverter());
    this.converters.set('DateTime', new DateTimeFieldConverter());
    this.converters.set('Time', new TimeFieldConverter());
    this.converters.set('Email', new EmailFieldConverter());
    this.converters.set('Phone', new PhoneFieldConverter());
    this.converters.set('URL', new URLFieldConverter());
    this.converters.set('Currency', new CurrencyFieldConverter());
    this.converters.set('Percent', new PercentFieldConverter());
    this.converters.set('Lookup', new LookupFieldConverter());
    this.converters.set('MasterDetail', new MasterDetailFieldConverter());
    this.converters.set('Formula', new FormulaFieldConverter());
    this.converters.set('Summary', new SummaryFieldConverter());
    this.converters.set('AutoNumber', new AutoNumberFieldConverter());
    this.converters.set('Location', new LocationFieldConverter());
    this.converters.set('EncryptedText', new EncryptedTextFieldConverter());
  }
  
  getConverter(type: FieldType): FieldMetadataConverter {
    const converter = this.converters.get(type);
    if (!converter) {
      throw new Error(`No converter found for field type: ${type}`);
    }
    return converter;
  }
}

// Similar factory for XML generators
class FieldXMLGeneratorFactory {
  // Same pattern as above
}
```

---

## Usage Example

```typescript
// Initialize the transpiler
const config: TranspilerConfig = {
  apiVersion: '61.0',
  outputDirectory: './output',
  strictMode: true
};

const transpiler = new SalesforceMetadataTranspiler(config);

// Load JSON schema
const jsonSchema = JSON.parse(fs.readFileSync('schema.json', 'utf-8'));

// Transpile
const result = await transpiler.transpile(jsonSchema);

if (result.success) {
  console.log(`Deployment package created: ${result.zipPath}`);
} else {
  console.error('Transpilation failed:', result.errors);
}

// Check warnings
if (result.warnings.length > 0) {
  console.warn('Warnings:', result.warnings);
}
```

---

## Key Design Principles

1. **Single Responsibility**: Each class has one clear purpose
2. **Open/Closed**: Easy to add new field types without modifying existing code
3. **Strategy Pattern**: Different field converters/generators for different field types
4. **Factory Pattern**: Centralized creation of field converters and XML generators
5. **Dependency Injection**: Config and dependencies injected into constructors
6. **Validation-First**: Validate before processing to catch errors early
7. **Immutability**: Metadata structures are immutable once created
8. **Error Handling**: Comprehensive error collection and reporting

---

## Testing Strategy

1. **Unit Tests**: Each converter/generator class tested independently
2. **Integration Tests**: End-to-end transpilation tests
3. **Validation Tests**: Schema validation edge cases
4. **XML Generation Tests**: Verify XML structure matches Salesforce requirements
5. **Deployment Tests**: Actual deployment to Salesforce sandbox (optional)

---

## Extension Points

1. **Custom Field Types**: Add new field converters by extending base classes
2. **Custom Validators**: Add custom validation rules
3. **Output Formats**: Support different output formats (unzipped, different structures)
4. **Pre/Post Processors**: Hook into pipeline for custom transformations
5. **Plugins**: Plugin architecture for extended functionality

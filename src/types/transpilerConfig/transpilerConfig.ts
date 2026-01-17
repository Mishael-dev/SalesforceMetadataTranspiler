export interface TranspilerConfig {
  apiVersion: string;           // Required Salesforce API version
  outputDirectory?: string;     // Optional, default './output'
  validateOnly?: boolean;       // Optional, default false
}
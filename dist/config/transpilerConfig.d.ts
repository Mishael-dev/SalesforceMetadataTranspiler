export interface TranspilerConfig {
    apiVersion: string;
    outputDirectory?: string;
    validateOnly?: boolean;
    includeActionOverrides?: boolean;
    strictMode?: boolean;
}

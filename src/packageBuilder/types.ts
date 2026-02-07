export interface PackageBuilderOptions {
    outputDirectory: string;
    outputMode?: 'directory' | 'zip';
}

export interface BuildResult {
    success: boolean;
    outputPath: string;
    filesWritten: string[];
    errors?: string[];
}
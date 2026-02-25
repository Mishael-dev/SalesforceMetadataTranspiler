"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpilerConfig = void 0;
const salesforceMetadataTranspiler_1 = require("./salesforceMetadataTranspiler");
const jsonMetadata_1 = require("./Demo/jsonMetadata");
exports.transpilerConfig = {
    apiVersion: "v65.0", // Required Salesforce API version
    outputDirectory: "./output", // Optional, default './output'
    validateOnly: true, // Optional, default false
};
const transpiler = new salesforceMetadataTranspiler_1.SalesforceMetadataTranspiler(exports.transpilerConfig);
async function transpileSchema() {
    const generatedXml = await transpiler.transpile(jsonMetadata_1.jsonMetadata);
    console.log("generatedxml", generatedXml);
    // const builder = new PackageBuilder({
    //   outputDirectory: "./package.zip",
    //   outputMode: "zip",
    // });
    // const result = await builder.build(generatedXml);
    // if (result.success) {
    //   console.log("Package built successfully!");
    // } else {
    //   console.error("Failed to build package:", result.errors);
    // }
}
transpileSchema();

import { SalesforceMetadataTranspiler } from "./salesforceMetadataTranspiler";
import { PackageBuilder } from "./packageBuilder/PackageBuilder";
import { jsonMetadata } from "./Demo/jsonMetadata";

export const transpilerConfig = {
  apiVersion: "v65.0", // Required Salesforce API version
  outputDirectory: "./output", // Optional, default './output'
  validateOnly: true, // Optional, default false
};

const transpiler = new SalesforceMetadataTranspiler(transpilerConfig);

async function transpileSchema() {
  const transpileResult = await transpiler.transpile(jsonMetadata);

  console.log("Transpile Result", transpileResult);

  if (!transpileResult.success) {
    console.error("Errors Occured at transpilation", transpileResult.errors);
  }

  const builder = new PackageBuilder({
    outputDirectory: "./package.zip",
    outputMode: "zip",
  });

  if (transpileResult.success) {
    const result = await builder.build(transpileResult.data);

    if (result.success) {
      console.log("Package built successfully!");
    } else {
      console.error("Failed to build package:", result.errors);
    }
  }
}

transpileSchema();

import { Validator } from "./validator";
import { ValidationResult } from "./types/validationResult";
import { TranspilerConfig } from "./types/transpilerConfig";
import { createXmlGenerator } from "./xmlGenerator";
import { MetadataEnvelope } from "./schemas";
import { GeneratedXml } from "./xmlGenerator/types";

type XmlGeneratorInstance = ReturnType<typeof createXmlGenerator>;
type GeneratedXmlArray = GeneratedXml[];

class SalesforceMetadataTranspiler {
  private readonly validator: Validator;
  private readonly config: TranspilerConfig;
  private readonly xmlGenerator: XmlGeneratorInstance;

  constructor(config: TranspilerConfig) {
    this.config = {
      outputDirectory: "./output",
      validateOnly: false,
      ...config,
    };

    this.validator = new Validator();
    this.xmlGenerator = createXmlGenerator();
  }

  async transpile(input: unknown): Promise<GeneratedXmlArray> {
    console.log("the input passed=================", input);
    const validationResult: ValidationResult = this.validator.validate(input);

    if (!validationResult.normalizedData) {
      return [];
    }

    const outputs = validationResult.normalizedData?.flatMap((item) => {
      const result = this.xmlGenerator.generate(item);
      return result;
    });

    return outputs;
  }
}

export { SalesforceMetadataTranspiler };

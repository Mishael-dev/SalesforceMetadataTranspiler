import { Validator } from "./validator";
import { ValidationResult } from "./types/validationResult";
import { TranspilerConfig } from "./types/transpilerConfig";
import { createXmlGenerator } from "./xmlGenerator";
import { MetadataEnvelope } from "./schemas";
import { GeneratedXml } from "./xmlGenerator/types";
import { ValidationError } from "./types/validationResult";
import { TranspileResult } from "./types/transpileResult/transpileResult";
import { success } from "zod";

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

  async transpile(input: unknown): Promise<TranspileResult> {
    const validationResult: ValidationResult<MetadataEnvelope> =
      this.validator.validate(input);

    if (!validationResult.success) {
      return { success: false, errors: validationResult.errors,  };
    }

    const outputs = validationResult.normalizedData?.flatMap((item) => {
      const result = this.xmlGenerator.generate(item);
      return result;
    });

    const result = {
      success: true as const,
      data: outputs,
    };

    return result;
  }
}

export { SalesforceMetadataTranspiler };

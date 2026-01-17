import { Validator } from "./validator";
import { ValidationResult } from "./types/validationResult";
import { TranspilerConfig } from "./types/transpilerConfig";

class SalesforceMetadataTranspiler {
  private readonly validator: Validator;
  private readonly config: TranspilerConfig;

  constructor(config: TranspilerConfig) {
    this.config = {
      outputDirectory: "./output",
      validateOnly: false,
      ...config
    };

    this.validator = new Validator();
  }

  async transpile(input: unknown): Promise<ValidationResult<any>> {
    return this.validator.validate(input);
  }
}

export { SalesforceMetadataTranspiler };

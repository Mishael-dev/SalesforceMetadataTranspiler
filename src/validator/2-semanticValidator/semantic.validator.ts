import { MetadataValidator } from "./types";
import { MetadataItem } from "./types";
import { ValidationError } from "../../types/validationResult";
import { ValidationResult } from "../../types/validationResult";
import { MetadataEnvelope } from "../../schemas";

export class SemanticValidator {
  private validators: MetadataValidator[] = [];

  public registerValidator(validator: MetadataValidator): void {
    this.validators.push(validator);
  }

  public validate(schema: unknown) {
    // Type guard
    if (!Array.isArray(schema)) {
      return {
        success: false as false,
        errors: [
          {
            level: 1 as const,
            message: "Schema must be an array of metadata items",
            path: [],
          },
        ],
      };
    }

    const items = schema as MetadataEnvelope;
    const errors: ValidationError[] = [];

    // Validate each item
    for (const item of items) {
      const validator = this.validators.find((v) => v.supports(item));

      if (!validator) {
        errors.push({
          level: 1 as const,
          message: `No validator found for item type: ${item.type}`,
          path: [item.fullName || "<unknown>"],
        });
        continue;
      }

      // Run the validator and collect errors
      const itemErrors = validator.validate(item, items);
      errors.push(...itemErrors);
    }
    if (errors.length > 0) {
      return {
        success: false as false,
        errors
      };
    }

    return {
      success: true as true,
      errors: [],
      normalizedData: items,
    };
  }
}

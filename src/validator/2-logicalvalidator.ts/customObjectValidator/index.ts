import { ValidationError } from "../../../types/validationResult";
import { ValidationRule } from "../types";
import { MetadataValidator } from "../types";
import { MetadataItem } from "../types";
import { ValidationContext } from "../types";

const STANDARD_OBJECTS = new Set([
  "Account",
  "Contact",
  "Lead",
  "Opportunity",
  "Case",
  "User",
  "Task",
  "Event",
]);

export class CustomObjectSemanticValidator implements MetadataValidator {
  private rules: ValidationRule[] = [];

  constructor(private standardObjects: Set<string> = STANDARD_OBJECTS) {}

  public addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  supports(item: MetadataItem): boolean {
    return item.type === "CustomObject";
  }

  public validate(item: MetadataItem, allItems: MetadataItem[]): ValidationError[] {
    // Build validation context from all items
    const context = this.buildContext(allItems);

    // Run all rules against this single item wrapped in an array
    // (Rules expect arrays, so we wrap the single item)
    const errors = this.rules.flatMap((rule) => rule([item], context));

    return errors;
  }

  private buildContext(allItems: MetadataItem[]): ValidationContext {
    const customObjects = new Set<string>();

    for (const item of allItems) {
      if (item?.type === "CustomObject" && item.fullName) {
        customObjects.add(item.fullName);
      }
    }

    return {
      standardObjects: this.standardObjects,
      customObjects,
    };
  }
}
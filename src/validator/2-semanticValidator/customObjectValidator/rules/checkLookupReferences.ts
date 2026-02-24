import { CustomObject } from "../../../../xmlGenerator/types";
import { ValidationContext } from "../../types";
import { ValidationError } from "../../../../types/validationResult";

export function checkLookupReferences(
  data: CustomObject[],
  context: ValidationContext,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const item of data) {
    if (item?.type !== "CustomObject") continue;
    if (!item.fields) continue;

    for (const field of item.fields) {
      if (field.type !== "Lookup") continue;
      if (!field.referenceTo) continue;

      const isValid =
        context.customObjects.has(field.referenceTo) ||
        context.standardObjects.has(field.referenceTo);

      if (!isValid) {
        errors.push({
          level: 2,
          message: `Lookup field "${field.fullName}" references "${field.referenceTo}" which does not exist in schema or standard objects`,
          path: [item.fullName, "fields", field.fullName, "referenceTo"],
        });
      }
    }
  }

  return errors;
}

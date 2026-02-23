import { MetadataItem } from "../../types";
import { ValidationContext } from "../../types";
import { ValidationError } from "../../../../types/validationResult";

export function checkRollupSummaryReferences(
  data: MetadataItem[],
  context: ValidationContext,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const item of data) {
    if (item?.type !== "CustomObject") continue;
    if (!item.fields) continue;

    for (const field of item.fields) {
      if (field.type !== "RollupSummary") continue;
      if (!field.summarizedObject) continue;

      const objectExists =
        context.customObjects.has(field.summarizedObject) ||
        context.standardObjects.has(field.summarizedObject);

      if (!objectExists) {
        errors.push({
          level: 2,
          message: `Rollup Summary field "${field.fullName}" references object "${field.summarizedObject}" which does not exist in schema or standard objects`,
          path: [item.fullName, "fields", field.fullName, "summarizedObject"],
        });
      }
    }
  }

  return errors;
}
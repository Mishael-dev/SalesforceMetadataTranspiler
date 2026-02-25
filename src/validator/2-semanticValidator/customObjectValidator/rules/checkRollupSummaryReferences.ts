import { ValidationContext } from "../../types";
import { ValidationError } from "../../../../types/validationResult";
import { CustomObject } from "../../../../xmlGenerator/types";

export function checkRollupSummaryReferences(
  data: CustomObject[],
  context: ValidationContext,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const item of data) {
    if (item?.type !== "CustomObject") continue;
    if (!item.fields) continue;

    for (const field of item.fields) {
      if (field.type !== "Summary") continue;


      if (field.summarizedField) {
        const [summarizedObject] = field.summarizedField.split(".");

        const objectExists =
          context.customObjects.has(summarizedObject) ||
          context.standardObjects.has(summarizedObject);

        if (!objectExists) {
          errors.push({
            level: 2,
            message: `Rollup Summary field "${field.fullName}" references object "${summarizedObject}" which does not exist in schema or standard objects`,
            path: [item.fullName, "fields", field.fullName, "summarizedField"],
          });
        }
      }

      if (field.summaryForeignKey) {
        const [foreignKeyObject] = field.summaryForeignKey.split(".");
        const [foreignKeyField] = field.summaryForeignKey.split(".").slice(1);

        const objectExists =
          context.customObjects.has(foreignKeyObject) ||
          context.standardObjects.has(foreignKeyObject);

        if (!objectExists) {
          errors.push({
            level: 2,
            message: `Rollup Summary field "${field.fullName}" references foreign key object "${foreignKeyObject}" which does not exist in schema or standard objects`,
            path: [
              item.fullName,
              "fields",
              field.fullName,
              "summaryForeignKey",
            ],
          });
        }
      }
    }
  }

  return errors;
}

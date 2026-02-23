import { MetadataItem } from "../../types";
import { ValidationContext } from "../../types";
import { ValidationError } from "../../../../types/validationResult";


export function checkFormulaFieldReferences(
  data: MetadataItem[],
  context: ValidationContext,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const item of data) {
    if (item?.type !== "CustomObject") continue;
    if (!item.fields) continue;

    const validFields = new Set<string>();
    if (item.fields) {
      for (const field of item.fields) {
        if (field.fullName) {
          validFields.add(field.fullName);
        }
      }
    }

    for (const field of item.fields) {
      if (field.type !== "Formula") continue;
      if (!field.formula) continue;

      const references = extractFieldReferences(field.formula);

      for (const ref of references) {
        if (!validFields.has(ref)) {
          errors.push({
            level: 2,
            message: `Formula field "${field.fullName}" references field "${ref}" which does not exist in object "${item.fullName}"`,
            path: [item.fullName, "fields", field.fullName, "formula"],
          });
        }
      }
    }
  }

  return errors;
}

function extractFieldReferences(formula: string): string[] {
  const pattern = /\b[A-Z][a-zA-Z0-9_]*(?:__c)?\b/g;
  const matches = formula.match(pattern) || [];
  
  const formulaFunctions = new Set([
    "IF", "AND", "OR", "NOT", "ISBLANK", "ISNULL", "TEXT", 
    "VALUE", "DATE", "YEAR", "MONTH", "DAY", "TODAY", "NOW",
    "CONTAINS", "BEGINS", "CASE", "BLANKVALUE", "NULLVALUE"
  ]);
  
  return [...new Set(matches.filter(m => !formulaFunctions.has(m)))];
}
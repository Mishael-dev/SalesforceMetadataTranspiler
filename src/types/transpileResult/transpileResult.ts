import { ValidationResult } from "../validationResult";
import { GeneratedXml } from "../../xmlGenerator/types";
import { ValidationError } from "../validationResult";

export type TranspileResult =
  | { success: false; errors: ValidationError[]; }
  | { success: true; errors?: ValidationError[]; data: GeneratedXml[] };

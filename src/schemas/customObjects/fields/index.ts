import { AutoNumberFieldSchema } from "./autoNumber";
import { FormulaFieldSchema } from "./formula";

import {z} from "zod"
export const FieldSchema = z.discriminatedUnion("type", [
  AutoNumberFieldSchema,
  FormulaFieldSchema,
]);
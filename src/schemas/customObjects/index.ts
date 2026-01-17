import {z} from "zod"
import { FieldSchema } from "./fields";
import { ObjectSchema } from "./object";

export const CustomObjectWithFieldsSchema = ObjectSchema.extend({
  fields: z.array(FieldSchema),
});

export const CustomObjectsSchema = z.array(CustomObjectWithFieldsSchema);

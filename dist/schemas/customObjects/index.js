import { z } from "zod";
import { FieldSchema } from "./fields";
import { ObjectSchema } from "./object";
export const CustomObjectsSchema = ObjectSchema.extend({
    fields: z.array(FieldSchema),
});

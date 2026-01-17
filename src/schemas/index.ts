import {z} from "zod"
import { CustomObjectsSchema } from "./customObjects";

export const MetadataEnvelopeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("CustomObject"),
    metaData: CustomObjectsSchema,
  }),
  z.object({
    type: z.literal("PermissionSet"),
    metaData: z.array(z.any()), // Replace with PermissionSetSchema later
  }),
  z.object({
    type: z.literal("Tab"),
    metaData: z.array(z.any()), // Replace with TabSchema later
  }),
]);

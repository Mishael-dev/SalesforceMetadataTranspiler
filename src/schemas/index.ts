import { z } from "zod";
import { CustomObjectsSchema } from "./customObjects";

const CustomObjectMetadataSchema = z.object({
  type: z.literal("CustomObject"),
  ...CustomObjectsSchema.shape,
});

const PermissionSetMetadataSchema = z.object({
  type: z.literal("PermissionSet"),
  metaData: z.array(z.any()),
});

const TabMetadataSchema = z.object({
  type: z.literal("Tab"),
  metaData: z.array(z.any()),
});

const MetadataItemSchema = z.discriminatedUnion("type", [
  CustomObjectMetadataSchema,
  // PermissionSetMetadataSchema,
  // TabMetadataSchema,
]);

export const MetadataEnvelopeSchema = z.array(MetadataItemSchema);

export type MetadataEnvelope = z.infer<typeof MetadataEnvelopeSchema>;

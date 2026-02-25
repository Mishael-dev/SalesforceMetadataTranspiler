"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataEnvelopeSchema = void 0;
const zod_1 = require("zod");
const customObjects_1 = require("./customObjects");
const CustomObjectMetadataSchema = zod_1.z.object({
    type: zod_1.z.literal("CustomObject"),
    ...customObjects_1.CustomObjectsSchema.shape,
});
const PermissionSetMetadataSchema = zod_1.z.object({
    type: zod_1.z.literal("PermissionSet"),
    metaData: zod_1.z.array(zod_1.z.any()),
});
const TabMetadataSchema = zod_1.z.object({
    type: zod_1.z.literal("Tab"),
    metaData: zod_1.z.array(zod_1.z.any()),
});
const MetadataItemSchema = zod_1.z.discriminatedUnion("type", [
    CustomObjectMetadataSchema,
    // PermissionSetMetadataSchema,
    // TabMetadataSchema,
]);
exports.MetadataEnvelopeSchema = zod_1.z.array(MetadataItemSchema);

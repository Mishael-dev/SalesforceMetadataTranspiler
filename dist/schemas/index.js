"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataEnvelopeSchema = void 0;
const zod_1 = require("zod");
const customObjects_1 = require("./customObjects");
exports.MetadataEnvelopeSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal("CustomObject"),
        metaData: customObjects_1.CustomObjectsSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("PermissionSet"),
        metaData: zod_1.z.array(zod_1.z.any()), // Replace with PermissionSetSchema later
    }),
    zod_1.z.object({
        type: zod_1.z.literal("Tab"),
        metaData: zod_1.z.array(zod_1.z.any()), // Replace with TabSchema later
    }),
]);
//# sourceMappingURL=index.js.map
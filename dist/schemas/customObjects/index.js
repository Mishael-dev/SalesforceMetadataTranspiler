"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomObjectsSchema = exports.CustomObjectWithFieldsSchema = void 0;
const zod_1 = require("zod");
const fields_1 = require("./fields");
const object_1 = require("./object");
exports.CustomObjectWithFieldsSchema = object_1.ObjectSchema.extend({
    fields: zod_1.z.array(fields_1.FieldSchema),
});
exports.CustomObjectsSchema = zod_1.z.array(exports.CustomObjectWithFieldsSchema);
//# sourceMappingURL=index.js.map
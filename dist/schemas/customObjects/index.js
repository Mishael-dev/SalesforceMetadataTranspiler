"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomObjectsSchema = void 0;
const zod_1 = require("zod");
const fields_1 = require("./fields");
const object_1 = require("./object");
exports.CustomObjectsSchema = object_1.ObjectSchema.extend({
    fields: zod_1.z.array(fields_1.FieldSchema),
});

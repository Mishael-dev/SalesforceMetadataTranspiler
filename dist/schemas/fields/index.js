"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootSchema = exports.CustomObjectWithFieldsSchema = exports.FieldSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const autoNumber_schema_1 = require("./autoNumber.schema");
const formula_schema_1 = require("./formula.schema");
const customObject_schema_1 = require("../customObject.schema");
exports.FieldSchema = zod_1.default.discriminatedUnion("type", [
    autoNumber_schema_1.AutoNumberFieldSchema,
    formula_schema_1.FormulaFieldSchema
]);
exports.CustomObjectWithFieldsSchema = customObject_schema_1.CustomObjectSchema.extend({
    fields: zod_1.default.array(exports.FieldSchema)
});
exports.RootSchema = zod_1.default.array(exports.CustomObjectWithFieldsSchema);
//# sourceMappingURL=index.js.map
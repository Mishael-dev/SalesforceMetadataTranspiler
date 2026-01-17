"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSchema = void 0;
const autoNumber_1 = require("./autoNumber");
const formula_1 = require("./formula");
const zod_1 = require("zod");
exports.FieldSchema = zod_1.z.discriminatedUnion("type", [
    autoNumber_1.AutoNumberFieldSchema,
    formula_1.FormulaFieldSchema,
]);
//# sourceMappingURL=index.js.map
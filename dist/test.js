"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonMetadata_1 = require("./Demo/jsonMetadata");
const _2_semanticValidator_1 = require("./validator/2-semanticValidator");
async function test() {
    const result = _2_semanticValidator_1.semanticValidator.validate(jsonMetadata_1.jsonMetadata);
    console.log("result====", result);
}
test();

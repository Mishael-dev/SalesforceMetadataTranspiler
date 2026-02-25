"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceMetadataTranspiler = void 0;
const validator_1 = require("./validator");
const xmlGenerator_1 = require("./xmlGenerator");
class SalesforceMetadataTranspiler {
    constructor(config) {
        this.config = {
            outputDirectory: "./output",
            validateOnly: false,
            ...config,
        };
        this.validator = new validator_1.Validator();
        this.xmlGenerator = (0, xmlGenerator_1.createXmlGenerator)();
    }
    async transpile(input) {
        const validationResult = this.validator.validate(input);
        if (!validationResult.success) {
            return validationResult;
        }
        const outputs = validationResult.normalizedData?.flatMap((item) => {
            const result = this.xmlGenerator.generate(item);
            return result;
        });
        return outputs;
    }
}
exports.SalesforceMetadataTranspiler = SalesforceMetadataTranspiler;

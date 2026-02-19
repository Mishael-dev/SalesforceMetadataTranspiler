import { Validator } from "./validator";
import { createXmlGenerator } from "./xmlGenerator";
class SalesforceMetadataTranspiler {
    constructor(config) {
        this.config = {
            outputDirectory: "./output",
            validateOnly: false,
            ...config,
        };
        this.validator = new Validator();
        this.xmlGenerator = createXmlGenerator();
    }
    async transpile(input) {
        const validationResult = this.validator.validate(input);
        if (!validationResult.normalizedData) {
            return [];
        }
        const outputs = validationResult.normalizedData?.flatMap((item) => {
            const result = this.xmlGenerator.generate(item);
            return result;
        });
        return outputs;
    }
}
export { SalesforceMetadataTranspiler };

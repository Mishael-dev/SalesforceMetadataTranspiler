export class XmlGenerator {
    constructor() {
        this.generators = [];
    }
    registerGenerator(gen) {
        this.generators.push(gen);
        this.generators.sort((a, b) => a.priority - b.priority);
    }
    generate(input) {
        const results = [];
        this.processRecursive(input, results, {});
        return results;
    }
    processRecursive(item, results, context) {
        const generator = this.generators.find((g) => g.supports(item));
        if (generator) {
            const generated = generator.generate(item, context);
            results.push(generated);
            if (generator.getChildItems) {
                const children = generator.getChildItems(item);
                const newContext = {
                    parentFullName: item.fullName,
                };
                children.forEach((child) => {
                    this.processRecursive(child, results, newContext);
                });
            }
        }
        else {
            console.warn(`No generator found for item:`, item);
        }
    }
}

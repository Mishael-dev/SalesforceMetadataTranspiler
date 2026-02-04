
import { AtomicGenerator } from "./generators/atomicGenerator";
import { GeneratedXml } from "./types";
import { GenerationContext } from "./types";

export class XmlGenerator {
  private generators: AtomicGenerator[] = [];

  registerGenerator(gen: AtomicGenerator) {
    this.generators.push(gen);
    this.generators.sort((a, b) => a.priority - b.priority);
  }

  public generate(input: any): GeneratedXml[] {
    const results: GeneratedXml[] = [];
    this.processRecursive(input, results, {});
    return results;
  }

  private processRecursive(
    item: any,
    results: GeneratedXml[],
    context: GenerationContext,
  ) {
    const generator = this.generators.find((g) => g.supports(item));

    if (generator) {
      const generated = generator.generate(item, context);
      results.push(generated);

      if (generator.getChildItems) {
        const children = generator.getChildItems(item);
        const newContext: GenerationContext = {
          parentFullName: item.fullName,
        };

        children.forEach((child) => {
          this.processRecursive(child, results, newContext);
        });
      }
    } else {
      console.warn(`No generator found for item:`, item);
    }
  }
}
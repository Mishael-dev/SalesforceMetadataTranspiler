

import { XmlGenerator } from "./orchestrator";
import { CustomObjectGenerator } from "./generators/customObjects/object";
import { FormulaFieldGenerator } from "./generators/customObjects/fields/formula";
import { TextFieldGenerator } from "./generators/customObjects/fields/text";

export function createXmlGenerator(): XmlGenerator {
  const orchestrator = new XmlGenerator();

  // Register all known generators here
  orchestrator.registerGenerator(new CustomObjectGenerator());
  orchestrator.registerGenerator(new FormulaFieldGenerator());
  orchestrator.registerGenerator(new TextFieldGenerator());

  return orchestrator;
}
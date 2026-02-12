

import { XmlGenerator } from "./orchestrator";
import { CustomObjectGenerator } from "./generators/customObjects/object";
import { FormulaFieldGenerator } from "./generators/customObjects/fields/formula";
import { TextFieldGenerator } from "./generators/customObjects/fields/text";
import { LookupFieldGenerator } from "./generators/customObjects/fields/lookUp";
import { MasterDetailFieldGenerator } from "./generators/customObjects/fields/masterDetail";
import { PicklistFieldGenerator } from "./generators/customObjects/fields/picklist";
import { MultiselectPicklistFieldGenerator } from "./generators/customObjects/fields/multiSelectPicklist";
import { GenericFieldGenerator } from "./generators/customObjects/fields/genericFieldGenerator";
import { SummaryFieldGenerator } from "./generators/customObjects/fields/rollupSummary";

export function createXmlGenerator(): XmlGenerator {
  const orchestrator = new XmlGenerator();

  // Register all known generators here
  orchestrator.registerGenerator(new CustomObjectGenerator());
  orchestrator.registerGenerator(new FormulaFieldGenerator());
  orchestrator.registerGenerator(new TextFieldGenerator());
  orchestrator.registerGenerator(new LookupFieldGenerator())
  orchestrator.registerGenerator(new MasterDetailFieldGenerator())
  orchestrator.registerGenerator(new MultiselectPicklistFieldGenerator())
  orchestrator.registerGenerator(new PicklistFieldGenerator())
  orchestrator.registerGenerator(new LookupFieldGenerator())
  orchestrator.registerGenerator(new SummaryFieldGenerator());
  orchestrator.registerGenerator(new GenericFieldGenerator())

  return orchestrator;
}
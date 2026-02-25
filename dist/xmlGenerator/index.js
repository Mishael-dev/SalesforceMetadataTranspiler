"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createXmlGenerator = createXmlGenerator;
const orchestrator_1 = require("./orchestrator");
const object_1 = require("./generators/customObjects/object");
const formula_1 = require("./generators/customObjects/fields/formula");
const text_1 = require("./generators/customObjects/fields/text");
const lookUp_1 = require("./generators/customObjects/fields/lookUp");
const masterDetail_1 = require("./generators/customObjects/fields/masterDetail");
const picklist_1 = require("./generators/customObjects/fields/picklist");
const multiSelectPicklist_1 = require("./generators/customObjects/fields/multiSelectPicklist");
const genericFieldGenerator_1 = require("./generators/customObjects/fields/genericFieldGenerator");
const rollupSummary_1 = require("./generators/customObjects/fields/rollupSummary");
function createXmlGenerator() {
    const orchestrator = new orchestrator_1.XmlGenerator();
    // Register all known generators here
    orchestrator.registerGenerator(new object_1.CustomObjectGenerator());
    orchestrator.registerGenerator(new formula_1.FormulaFieldGenerator());
    orchestrator.registerGenerator(new text_1.TextFieldGenerator());
    orchestrator.registerGenerator(new lookUp_1.LookupFieldGenerator());
    orchestrator.registerGenerator(new masterDetail_1.MasterDetailFieldGenerator());
    orchestrator.registerGenerator(new multiSelectPicklist_1.MultiselectPicklistFieldGenerator());
    orchestrator.registerGenerator(new picklist_1.PicklistFieldGenerator());
    orchestrator.registerGenerator(new lookUp_1.LookupFieldGenerator());
    orchestrator.registerGenerator(new rollupSummary_1.SummaryFieldGenerator());
    orchestrator.registerGenerator(new genericFieldGenerator_1.GenericFieldGenerator());
    return orchestrator;
}

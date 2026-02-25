"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticValidator = void 0;
exports.createSemanticValidator = createSemanticValidator;
const semantic_validator_1 = require("./semantic.validator");
const checkLookupReferences_1 = require("./customObjectValidator/rules/checkLookupReferences");
const checkMasterDetailReferences_1 = require("./customObjectValidator/rules/checkMasterDetailReferences");
const customObjectValidator_1 = require("./customObjectValidator");
function createSemanticValidator() {
    const semanticValidator = new semantic_validator_1.SemanticValidator();
    // Create and register CustomObject validator with all rules
    const customObjectValidator = new customObjectValidator_1.CustomObjectSemanticValidator();
    customObjectValidator.addRule(checkLookupReferences_1.checkLookupReferences);
    customObjectValidator.addRule(checkMasterDetailReferences_1.checkMasterDetailReferences);
    // customObjectValidator.addRule(checkRollupSummaryReferences); === incomplete
    // customObjectValidator.addRule(checkFormulaFieldReferences);  === incomplete
    semanticValidator.registerValidator(customObjectValidator);
    // TODO: Register other validators (ApexClass, PermissionSet, etc.)
    // semanticValidator.registerValidator(new ApexClassValidator());
    return semanticValidator;
}
// ============================================================================
// DEFAULT EXPORT
// ============================================================================
exports.semanticValidator = createSemanticValidator();

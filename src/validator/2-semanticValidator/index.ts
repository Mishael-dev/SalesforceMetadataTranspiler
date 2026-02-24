
import { SemanticValidator } from "./semantic.validator";
import { checkLookupReferences } from "./customObjectValidator/rules/checkLookupReferences";
import { checkMasterDetailReferences } from "./customObjectValidator/rules/checkMasterDetailReferences";
import { checkRollupSummaryReferences } from "./customObjectValidator/rules/checkRollupSummaryReferences";
import { checkFormulaFieldReferences } from "./customObjectValidator/rules/checkFormulaFieldReferences";
import { CustomObjectSemanticValidator } from "./customObjectValidator";

export function createSemanticValidator(): SemanticValidator {
  const semanticValidator = new SemanticValidator();
  
  // Create and register CustomObject validator with all rules
  const customObjectValidator = new CustomObjectSemanticValidator();
  customObjectValidator.addRule(checkLookupReferences);
  customObjectValidator.addRule(checkMasterDetailReferences);
  customObjectValidator.addRule(checkRollupSummaryReferences);
  customObjectValidator.addRule(checkFormulaFieldReferences);
  
  semanticValidator.registerValidator(customObjectValidator);
  
  // TODO: Register other validators (ApexClass, PermissionSet, etc.)
  // semanticValidator.registerValidator(new ApexClassValidator());
  
  return semanticValidator;
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export const semanticValidator = createSemanticValidator();

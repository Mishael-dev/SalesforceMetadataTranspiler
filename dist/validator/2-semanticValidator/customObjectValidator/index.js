"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomObjectSemanticValidator = void 0;
const STANDARD_OBJECTS = new Set([
    "Account",
    "Contact",
    "Lead",
    "Opportunity",
    "Case",
    "User",
    "Task",
    "Event",
]);
class CustomObjectSemanticValidator {
    constructor(standardObjects = STANDARD_OBJECTS) {
        this.standardObjects = standardObjects;
        this.rules = [];
    }
    addRule(rule) {
        this.rules.push(rule);
    }
    supports(item) {
        return item.type === "CustomObject";
    }
    validate(item, allItems) {
        // Build validation context from all items
        const context = this.buildContext(allItems);
        // Run all rules against this single item wrapped in an array
        // (Rules expect arrays, so we wrap the single item)
        const errors = this.rules.flatMap((rule) => rule([item], context));
        return errors;
    }
    buildContext(allItems) {
        const customObjects = new Set();
        for (const item of allItems) {
            if (item?.type === "CustomObject" && item.fullName) {
                customObjects.add(item.fullName);
            }
        }
        return {
            standardObjects: this.standardObjects,
            customObjects,
        };
    }
}
exports.CustomObjectSemanticValidator = CustomObjectSemanticValidator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMasterDetailReferences = checkMasterDetailReferences;
function checkMasterDetailReferences(data, context) {
    const errors = [];
    for (const item of data) {
        if (item?.type !== "CustomObject")
            continue;
        if (!item.fields)
            continue;
        for (const field of item.fields) {
            if (field.type !== "MasterDetail")
                continue;
            if (!field.referenceTo)
                continue;
            const isValid = context.customObjects.has(field.referenceTo) ||
                context.standardObjects.has(field.referenceTo);
            if (!isValid) {
                errors.push({
                    level: 2,
                    message: `Master-Detail field "${field.fullName}" references "${field.referenceTo}" which does not exist in schema or standard objects`,
                    path: [item.fullName, "fields", field.fullName, "referenceTo"],
                });
            }
        }
    }
    return errors;
}

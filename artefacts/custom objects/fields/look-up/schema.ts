import { z } from "zod";

export const LookupFieldSchema = z.object({
  type: z.literal("Lookup")
    .describe("The Salesforce metadata type identifier for this field."),

  label: z.string()
    .min(1, "Lookup field label cannot be empty.")
    .describe("The user-facing label of the lookup field."),

  fullName: z.string()
    .regex(/__c$/, "Lookup field API name must end with '__c'.")
    .describe("The unique API name for the lookup field."),

  referenceTo: z.string()
    .min(1, "Lookup must reference a valid parent object.")
    .describe("The API name of the object this field references."),

  relationshipName: z.string()
    .min(1, "RelationshipName must be provided when referenceTo is defined.")
    .describe("API name used for parent-to-child relationship traversal."),

  relationshipLabel: z.string()
    .min(1, "RelationshipLabel must be provided when RelationshipName exists.")
    .describe("Label shown for the related list on the parent record."),

  deleteConstraint: z.enum(["SetNull", "Restrict"])
    .default("SetNull")
    .describe("Behavior applied when the parent record is deleted. Valid options: SetNull, Restrict (Cascade is only for Master-Detail)."),

  description: z.string().optional()
    .describe("Internal admin-facing description of the lookup field."),

  helpText: z.string().optional()
    .describe("Help text displayed to end users."),

  required: z.boolean().default(false)
    .describe("Whether this lookup field is required."),

  trackHistory: z.boolean().default(false)
    .describe("Whether changes to this field are tracked in field history."),

  trackTrending: z.boolean().default(false)
    .describe("System-injected field for Salesforce metadata API compatibility."),
})
/* Object-level validation notes (cannot be enforced in single-field schema):
  1. relationshipName must be unique across all Lookup and Master-Detail fields on the parent object.
  2. relationshipName must not match the parent object's API name.
  3. referenceTo must point to a valid object defined in the schema.
*/

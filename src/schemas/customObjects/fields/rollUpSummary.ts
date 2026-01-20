import { z } from "zod";

export const RollupSummaryFieldSchema = z
  .object({
    type: z.literal("Summary"),
    label: z.string().min(1).max(40),
    fullName: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]+__c$/,
        "Must be a valid Salesforce custom field API name ending in __c",
      ),
    description: z.string().optional(),
    inlineHelpText: z.string().optional(),
    summarizedField: z.string().min(1),
    summaryForeignKey: z.string().min(1),
    summaryOperation: z.enum(["min", "max", "sum", "avg", "count"]),
    trackHistory: z.boolean().optional(),
    trackTrending: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Level 2 / cross-field refinements

    // Example: summarizedField and summaryForeignKey must reference valid child object fields
    if (!data.summarizedField.includes(".")) {
      ctx.addIssue({
        code: "custom",
        path: ["summarizedField"],
        message:
          "summarizedField must include the object and field name, e.g., 'Child__c.Field__c'",
      });
    }

    if (!data.summaryForeignKey.includes(".")) {
      ctx.addIssue({
        code: "custom",
        path: ["summaryForeignKey"],
        message:
          "summaryForeignKey must include the object and field name, e.g., 'Child__c.Lookup__c'",
      });
    }
  });

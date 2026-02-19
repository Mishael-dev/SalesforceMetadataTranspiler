import { z } from "zod";
export declare const RollupSummaryFieldSchema: z.ZodObject<{
    type: z.ZodLiteral<"Summary">;
    label: z.ZodString;
    fullName: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
    summarizedField: z.ZodString;
    summaryForeignKey: z.ZodString;
    summaryOperation: z.ZodEnum<{
        min: "min";
        max: "max";
        sum: "sum";
        avg: "avg";
        count: "count";
    }>;
    trackHistory: z.ZodOptional<z.ZodBoolean>;
    trackTrending: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=rollUpSummary.d.ts.map
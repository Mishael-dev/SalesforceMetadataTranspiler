import { z } from 'zod';
export declare const DateFieldSchema: z.ZodObject<{
    type: z.ZodLiteral<"Date">;
    fullName: z.ZodString;
    label: z.ZodString;
    defaultValue: z.ZodOptional<z.ZodString>;
    required: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    inlineHelpText: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=date.d.ts.map
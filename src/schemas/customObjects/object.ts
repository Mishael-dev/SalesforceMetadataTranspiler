import {z} from "zod"

export const ObjectSchema = z.object({
  // --- 1. Core Object Configuration (Required from LLM) ---
  label: z
    .string()
    .min(1, "Label is required")
    .describe(
      "The singular display name for the object (e.g., 'Kitchen Sink')."
    ),

  pluralLabel: z
    .string()
    .min(1, "Plural Label is required")
    .describe(
      "The plural display name used for tabs and navigation (e.g., 'Kitchen Sinks')."
    ),

  description: z
    .string()
    .optional()
    .describe(
      "A detailed explanation of what this object tracks and why it was created."
    ),

  nameField: z
    .object({
      label: z
        .string()
        .min(1, "Name Field Label is required")
        .describe(
          "The label for the record's primary identifier field (e.g., 'Account Name')."
        ),
      type: z
        .enum(["Text", "AutoNumber"])
        .default("Text")
        .describe(
          "Determines if the Name field is a manually entered 'Text' string or a system-generated 'AutoNumber'."
        ),
      trackHistory: z
        .boolean()
        .default(false)
        .describe(
          "If true, Salesforce will log changes specifically for the Name field."
        ),
    })
    .describe(
      "Configuration for the standard Name field that every custom object must have."
    ),

  // --- 2. Supporting Features (Defaults/UI Toggles) ---
  deploymentStatus: z
    .enum(["InDevelopment", "Deployed"])
    .default("Deployed")
    .describe(
      "'InDevelopment' hides the object from end-users; 'Deployed' makes it available for use."
    ),

  allowInChatterGroups: z
    .boolean()
    .default(true)
    .describe(
      "Enables the ability to mention specific records of this object in Chatter groups."
    ),

  enableActivities: z
    .boolean()
    .default(true)
    .describe(
      "Allows users to associate Tasks and Events (Calendar) with records of this object."
    ),

  enableBulkApi: z
    .boolean()
    .default(true)
    .describe(
      "Allows the object to be processed by high-volume data tools like Data Loader."
    ),

  enableFeeds: z
    .boolean()
    .default(false)
    .describe(
      "Enables Chatter Feed tracking, allowing users to 'Follow' records and see updates in a feed."
    ),

  enableHistory: z
    .boolean()
    .default(true)
    .describe(
      "Enables the 'Field History Tracking' feature for the object as a whole."
    ),

  enableLicensing: z
    .boolean()
    .default(false)
    .describe(
      "Used for managed packages to restrict access based on user licenses."
    ),

  enableReports: z
    .boolean()
    .default(true)
    .describe(
      "Allows this object to be used as a source in Salesforce Reports and Dashboards."
    ),

  enableSearch: z
    .boolean()
    .default(true)
    .describe("Enables the global search bar to find records of this object."),

  enableSharing: z
    .boolean()
    .default(true)
    .describe(
      "Determines if the object follows the Org-Wide Default sharing rules and manual sharing."
    ),

  enableStreamingApi: z
    .boolean()
    .default(true)
    .describe(
      "Allows external applications to 'subscribe' to record changes via the Salesforce Streaming API."
    ),

  visibility: z
    .string()
    .default("Public")
    .describe(
      "Determines if the object is 'Public' (visible to all) or 'Protected' (hidden within a managed package)."
    ),
});
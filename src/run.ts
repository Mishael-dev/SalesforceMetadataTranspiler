import { CustomObject } from "./xmlGenerator/types";
import { XmlGenerator } from "./xmlGenerator/orchestrator";
import { transpilerConfig } from "./stage";
import { SalesforceMetadataTranspiler } from "./salesforceMetadataTranspiler";
import { TranspilerConfig } from "./types/transpilerConfig";
import { CustomObjectsSchema } from "./schemas/customObjects";
import { createXmlGenerator } from "./xmlGenerator";
import { MetadataEnvelopeSchema } from "./schemas";

const orchestrator = createXmlGenerator();

export const schema = [
  {
    type: "CustomObject",
    label: "Asset",
    fullName: "Asset__c",
    pluralLabel: "Assets",
    description:
      "Represents a company asset used for tracking inventory and lifecycle status.",
    deploymentStatus: "Deployed",
    allowInChatterGroups: true,
    nameField: {
      label: "Asset Name",
      type: "Text",
      trackHistory: false,
    },
    enableActivities: true,
    enableBulkApi: true,
    enableFeeds: false,
    enableHistory: true,
    enableLicensing: false,
    enableReports: true,
    enableSearch: true,
    enableSharing: true,
    enableStreamingApi: true,
    visibility: "Public",
    fields: [
      {
        type: "Formula",
        label: "Asset Status Label",
        fullName: "Asset_Status_Label__c",
        formula: 'IF(NOT(ISBLANK(Asset_ID__c)), "ACTIVE: " & Name, "INACTIVE")',
        blankOption: "BlankAsZero",
        description:
          "Displays a human-readable status based on whether the asset has been assigned an ID.",
        helpText: "Shows ACTIVE or INACTIVE followed by the record name.",
        externalId: false,
        required: false,
        unique: false,
        trackHistory: false,
      },
    ],
  }
] as const;

const payload: CustomObject = {
  type: "CustomObject",
  label: "Asset",
  fullName: "Asset__c",
  pluralLabel: "Assets",
  description:
    "Represents a company asset used for tracking inventory and lifecycle status.",
  deploymentStatus: "Deployed",
  allowInChatterGroups: true,
  nameField: {
    label: "Asset Name",
    type: "Text",
    trackHistory: false,
  },
  enableActivities: true,
  enableBulkApi: true,
  enableFeeds: false,
  enableHistory: true,
  enableLicensing: false,
  enableReports: true,
  enableSearch: true,
  enableSharing: true,
  enableStreamingApi: true,
  visibility: "Public",
  fields: [
    {
      type: "Formula",
      label: "Asset Status Label",
      fullName: "Asset_Status_Label__c",
      formula: 'IF(NOT(ISBLANK(Asset_ID__c)), "ACTIVE: " & Name, "INACTIVE")',
      blankOption: "BlankAsZero",
      description:
        "Displays a human-readable status based on whether the asset has been assigned an ID.",
      helpText: "Shows ACTIVE or INACTIVE followed by the record name.",
      externalId: false,
      required: false,
      unique: false,
      trackHistory: false,
    },
  ],
};

const transpiler = new SalesforceMetadataTranspiler(transpilerConfig);

async function transpileSchema() {
  const result = await transpiler.transpile(schema);

  console.log(result);
}

transpileSchema();

// const output = orchestrator.generate(schema[0]);

// console.log(output);


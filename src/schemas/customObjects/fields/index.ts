import { AutoNumberFieldSchema } from "./autoNumber";
import { FormulaFieldSchema } from "./formula";
import { CheckboxFieldSchema } from "./checkBox";
import { CurrencyFieldSchema } from "./currency";
import { DateFieldSchema } from "./date";
import { DateTimeFieldSchema } from "./dateTime";
import { EmailFieldSchema } from "./email";
import { GeoLocationFieldSchema } from "./geoLocation";
import { LookupFieldSchema } from "./lookUp";
import { MasterDetailFieldSchema } from "./masterDetail";
import { NumberFieldSchema } from "./number";
import { PercentFieldSchema } from "./percent";
import { PhoneFieldSchema } from "./phone";
import { PicklistFieldSchema } from "./picklist";
import { MultiSelectPicklistFieldSchema } from "./picklistMultiSelect";
import { TextFieldSchema } from "./text";
import { TextAreaFieldSchema } from "./textArea";
import { EncryptedTextFieldSchema } from "./encryptedTextArea";
import { LongTextAreaFieldSchema } from "./longTextArea";
import { RichTextAreaFieldSchema } from "./richTextArea";
import { TimeFieldSchema } from "./time";
import { UrlFieldSchema } from "./url";
import { RollupSummaryFieldSchema } from "./rollUpSummary";

import { z } from "zod";

export const FieldSchema = z.discriminatedUnion("type", [
  AutoNumberFieldSchema,
  FormulaFieldSchema,
  CheckboxFieldSchema,
  CurrencyFieldSchema,
  DateFieldSchema,
  DateTimeFieldSchema,
  EmailFieldSchema,
  GeoLocationFieldSchema,
  LookupFieldSchema,
  MasterDetailFieldSchema,
  NumberFieldSchema,
  PercentFieldSchema,
  PhoneFieldSchema,
  PicklistFieldSchema,
  MultiSelectPicklistFieldSchema,
  TextFieldSchema,
  TextAreaFieldSchema,
  EncryptedTextFieldSchema,
  LongTextAreaFieldSchema,
  RichTextAreaFieldSchema,
  TimeFieldSchema,
  UrlFieldSchema,
  RollupSummaryFieldSchema
]);
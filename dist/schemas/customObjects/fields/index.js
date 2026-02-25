"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSchema = void 0;
const autoNumber_1 = require("./autoNumber");
const formula_1 = require("./formula");
const checkBox_1 = require("./checkBox");
const currency_1 = require("./currency");
const date_1 = require("./date");
const dateTime_1 = require("./dateTime");
const email_1 = require("./email");
const geoLocation_1 = require("./geoLocation");
const lookUp_1 = require("./lookUp");
const masterDetail_1 = require("./masterDetail");
const number_1 = require("./number");
const percent_1 = require("./percent");
const phone_1 = require("./phone");
const picklist_1 = require("./picklist");
const picklistMultiSelect_1 = require("./picklistMultiSelect");
const text_1 = require("./text");
const textArea_1 = require("./textArea");
const encryptedTextArea_1 = require("./encryptedTextArea");
const longTextArea_1 = require("./longTextArea");
const richTextArea_1 = require("./richTextArea");
const time_1 = require("./time");
const url_1 = require("./url");
const rollUpSummary_1 = require("./rollUpSummary");
const zod_1 = require("zod");
exports.FieldSchema = zod_1.z.discriminatedUnion("type", [
    autoNumber_1.AutoNumberFieldSchema,
    formula_1.FormulaFieldSchema,
    checkBox_1.CheckboxFieldSchema,
    currency_1.CurrencyFieldSchema,
    date_1.DateFieldSchema,
    dateTime_1.DateTimeFieldSchema,
    email_1.EmailFieldSchema,
    geoLocation_1.GeoLocationFieldSchema,
    lookUp_1.LookupFieldSchema,
    masterDetail_1.MasterDetailFieldSchema,
    number_1.NumberFieldSchema,
    percent_1.PercentFieldSchema,
    phone_1.PhoneFieldSchema,
    picklist_1.PicklistFieldSchema,
    picklistMultiSelect_1.MultiSelectPicklistFieldSchema,
    text_1.TextFieldSchema,
    textArea_1.TextAreaFieldSchema,
    encryptedTextArea_1.EncryptedTextFieldSchema,
    longTextArea_1.LongTextAreaFieldSchema,
    richTextArea_1.RichTextAreaFieldSchema,
    time_1.TimeFieldSchema,
    url_1.UrlFieldSchema,
    rollUpSummary_1.RollupSummaryFieldSchema
]);

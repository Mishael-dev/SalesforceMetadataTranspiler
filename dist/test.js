import { MetadataMerger } from "./packageBuilder/MetadataMerger";
import { FileOrganizer } from "./packageBuilder/FileOrganizer";
import { ManifestGenerator } from "./packageBuilder/ManifestGenerator";
import { PackageBuilder } from "./packageBuilder/PackageBuilder";
const artifacts = [
    {
        metadataType: "CustomObject",
        fullName: "Asset 2",
        xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">\n' +
            "    <deploymentStatus>Deployed</deploymentStatus>\n" +
            "    <description>Represents a company asset used for tracking inventory and lifecycle status.</description>\n" +
            "    <label>Asset</label>\n" +
            "    <pluralLabel>Assets</pluralLabel>\n" +
            "    <nameField>\n" +
            "        <label>Asset Name</label>\n" +
            "        <type>Text</type>\n" +
            "        <trackHistory>false</trackHistory>\n" +
            "    </nameField>\n" +
            "    <allowInChatterGroups>true</allowInChatterGroups>\n" +
            "    <enableActivities>true</enableActivities>\n" +
            "    <enableBulkApi>true</enableBulkApi>\n" +
            "    <enableFeeds>false</enableFeeds>\n" +
            "    <enableHistory>true</enableHistory>\n" +
            "    <enableLicensing>false</enableLicensing>\n" +
            "    <enableReports>true</enableReports>\n" +
            "    <enableSearch>true</enableSearch>\n" +
            "    <enableSharing>true</enableSharing>\n" +
            "    <enableStreamingApi>true</enableStreamingApi>\n" +
            "    <visibility>Public</visibility>\n" +
            "</CustomObject>",
    },
    {
        metadataType: "CustomField",
        fullName: "Asset 2.text__c",
        parentFullName: "Asset 2",
        xml: "\n" +
            "<fields>\n" +
            "<fullName>text__c</fullName>\n" +
            "    <label>Text Field</label>\n" +
            "    <type>Text</type>\n" +
            "    <description>text description</description>\n" +
            "    <trackHistory>false</trackHistory>\n" +
            "    <trackTrending>false</trackTrending>\n" +
            "    <externalId>false</externalId>\n" +
            "    <required>false</required>\n" +
            "    <unique>false</unique>\n" +
            "    <length>20</length>\n" +
            "</fields>",
    },
    {
        metadataType: "CustomField",
        fullName: "Asset 2.text_area__c",
        parentFullName: "Asset 2",
        xml: "\n" +
            "<fields>\n" +
            "<fullName>text_area__c</fullName>\n" +
            "    <label>Text Area Field</label>\n" +
            "    <type>TextArea</type>\n" +
            "    <description>text area description</description>\n" +
            "    <trackHistory>false</trackHistory>\n" +
            "    <trackTrending>false</trackTrending>\n" +
            "    <required>false</required>\n" +
            "</fields>",
    },
    {
        metadataType: "CustomObject",
        fullName: "Asset 3",
        xml: '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">\n' +
            "    <deploymentStatus>Deployed</deploymentStatus>\n" +
            "    <description>Represents hardware devices assigned to employees or departments.</description>\n" +
            "    <label>Device</label>\n" +
            "    <pluralLabel>Devices</pluralLabel>\n" +
            "    <nameField>\n" +
            "        <label>Device Name</label>\n" +
            "        <type>Text</type>\n" +
            "        <trackHistory>false</trackHistory>\n" +
            "    </nameField>\n" +
            "    <allowInChatterGroups>true</allowInChatterGroups>\n" +
            "    <enableActivities>true</enableActivities>\n" +
            "    <enableBulkApi>true</enableBulkApi>\n" +
            "    <enableFeeds>false</enableFeeds>\n" +
            "    <enableHistory>true</enableHistory>\n" +
            "    <enableLicensing>false</enableLicensing>\n" +
            "    <enableReports>true</enableReports>\n" +
            "    <enableSearch>true</enableSearch>\n" +
            "    <enableSharing>true</enableSharing>\n" +
            "    <enableStreamingApi>true</enableStreamingApi>\n" +
            "    <visibility>Public</visibility>\n" +
            "</CustomObject>",
    },
    {
        metadataType: "CustomField",
        fullName: "Asset 2.text_area_encrypted__c",
        parentFullName: "Asset 2",
        xml: "\n" +
            "<fields>\n" +
            "<fullName>text_area_encrypted__c</fullName>\n" +
            "    <label>Encrypted Text Area</label>\n" +
            "    <type>EncryptedText</type>\n" +
            "    <description>text area encrypted description</description>\n" +
            "    <trackHistory>false</trackHistory>\n" +
            "    <trackTrending>false</trackTrending>\n" +
            "    <required>false</required>\n" +
            "    <length>12</length>\n" +
            "    <maskChar>asterisk</maskChar>\n" +
            "    <maskType>ssn</maskType>\n" +
            "</fields>",
    },
    {
        metadataType: "CustomField",
        fullName: "Asset 2.text_area_long__c",
        parentFullName: "Asset 2",
        xml: "\n" +
            "<fields>\n" +
            "<fullName>text_area_long__c</fullName>\n" +
            "    <label>Long Text Area</label>\n" +
            "    <type>LongTextArea</type>\n" +
            "    <description>text area long description</description>\n" +
            "    <trackHistory>false</trackHistory>\n" +
            "    <trackTrending>false</trackTrending>\n" +
            "    <length>32768</length>\n" +
            "    <visibleLines>3</visibleLines>\n" +
            "</fields>",
    },
    {
        metadataType: "CustomField",
        fullName: "Asset 2.text_area_rich__c",
        parentFullName: "Asset 2",
        xml: "\n" +
            "<fields>\n" +
            "<fullName>text_area_rich__c</fullName>\n" +
            "    <label>Rich Text Area</label>\n" +
            "    <type>Html</type>\n" +
            "    <description>text area rich description</description>\n" +
            "    <trackHistory>false</trackHistory>\n" +
            "    <trackTrending>false</trackTrending>\n" +
            "    <length>32768</length>\n" +
            "    <visibleLines>25</visibleLines>\n" +
            "</fields>",
    },
    {
        metadataType: "CustomField",
        fullName: "Asset 2.time__c",
        parentFullName: "Asset 2",
        xml: "\n" +
            "<fields>\n" +
            "<fullName>time__c</fullName>\n" +
            "    <label>Time Field</label>\n" +
            "    <type>Time</type>\n" +
            "    <description>time description</description>\n" +
            "    <trackHistory>false</trackHistory>\n" +
            "    <trackTrending>false</trackTrending>\n" +
            "    <required>false</required>\n" +
            "</fields>",
    },
    {
        metadataType: "CustomField",
        fullName: "Asset 2.url__c",
        parentFullName: "Asset 2",
        xml: "\n" +
            "<fields>\n" +
            "<fullName>url__c</fullName>\n" +
            "    <label>Website URL</label>\n" +
            "    <type>Url</type>\n" +
            "    <description>url description</description>\n" +
            "    <trackHistory>false</trackHistory>\n" +
            "    <trackTrending>false</trackTrending>\n" +
            "    <required>false</required>\n" +
            "</fields>",
    },
];
// 2. Initialize and Run Merger
const merger = new MetadataMerger();
const mergedArtifacts = merger.mergeFields(artifacts);
const organizer = new FileOrganizer();
const fileMap = organizer.organize(mergedArtifacts);
const generator = new ManifestGenerator();
const packageXml = generator.generate(mergedArtifacts, "60.0");
async function run() {
    const builder = new PackageBuilder({
        outputDirectory: './final-package',
        outputMode: 'directory'
    });
    const result = await builder.build(artifacts);
    if (result.success) {
        console.log('Package built successfully!');
    }
    else {
        console.error('Failed to build package:', result.errors);
    }
}
run();

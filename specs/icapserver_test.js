const { I, policyPage, filedropPage, requesthistoryPage, sharepoint,icapclient } = inject();
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const { output } = require("codeceptjs");

Feature('File Processing');


Scenario('I process a non supported file using icap client tool', async () => {
    const file = 'icaptest.ps1'
    const filePath = `output/downloads`
    //I.cleanupFile(file);
    const resp = await I.submitFile(file)
    const icapCode = I.getIcapHeaderCode(resp)
    if (icapCode === '204 Unmodified') {
        I.say('The responde is: ' + icapCode)
        I.say('Submitted file is relayed')
    } else {
        const respCode = await I.getResponseCode(resp)
        if (respCode === '403 Forbidden') {
            I.say('Submitted file is blocked')
        } else {
            I.say('Submitted file response is: ' + respCode)
        }
    }
}).tag('@ns').tag('@fileprocess').tag('@functional');

Scenario('Supported office files process is successful', async () => {
    var inPath = './src/data/office';
    var outputPath = './output/downloads'
  await icapclient.processFiles(inPath,outputPath);
}).tag('@office').tag('@fileprocess').tag('@functional');

Scenario('Supported image files process is successful', async () => {
    var inPath = './src/data/images';
    var outputPath = './output/downloads'
  await icapclient.processFiles(inPath,outputPath);
}).tag('@images').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', async () => {
    var inPath = './src/data/pdf';
    var outputPath = './output/downloads'
  await icapclient.processFiles(inPath,outputPath);
}).tag('@pdf').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', async () => {
    var inPath = './src/data/rtf';
    var outputPath = './output/downloads'
  await icapclient.processFiles(inPath,outputPath);
}).tag('@rtf').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', async () => {
    var inPath = './src/data/rtf';
    var outputPath = './output/downloads'
  await icapclient.processFiles(inPath,outputPath);
}).tag('@rtf').tag('@fileprocess').tag('@functional');

Scenario('Supported archive files process is successful', async () => {
    var inPath = './src/data/archive_success';
    var outputPath = './output/downloads'
  await icapclient.processFiles(inPath,outputPath);
}).tag('@archives').tag('@fileprocess').tag('@functional');



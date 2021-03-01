const { I, icapclient } = inject();
const outputPath = './src/data/fileOutput'
const assert = require('assert').strict;
const { output } = require("codeceptjs");


Feature('Icap Client File Processing');


Scenario('I process a non supported file using icap client tool', async () => {
  const file = 'icaptest.ps1'
  I.cleanupFile(`${outputPath}/${file}`);
  const resp = icapclient.submitFile(file)
  const icapCode = I.getIcapHeaderCode(resp)
  if (icapCode === '204 Unmodified') {
    console.log('The response is: ' + icapCode)
    console.log('Submitted file is relayed')
    I.confirmFileiSNotAvailable(`${outputPath}/${file}`)
  } else if (icapCode === '200 OK') {
    const respCode = I.getResponseCode(resp)
    if (respCode === '403 Forbidden') {
      console.log('Submitted file is blocked')
      I.checkFileOutputIsHtmlReport(`${outputPath}/${file}`)
    } else {
      console.log('Submitted file response is: ' + respCode)
    }
  }
}).tag('@ns').tag('@fileprocess').tag('@functional');

Scenario('Supported office files process is successful', () => {
  const inPath = './src/data/office';
  icapclient.processFiles(inPath, outputPath);
}).tag('@office').tag('@fileprocess').tag('@functional');

Scenario('Supported image files process is successful', () => {
  const inPath = './src/data/images';
  icapclient.processFiles(inPath, outputPath);
}).tag('@images').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', function () {
    const inPath = './src/data/pdf';
    icapclient.processFiles(inPath, outputPath);
  }).tag('@pdf').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', () => {
  const inPath = './src/data/rtf';
  icapclient.processFiles(inPath, outputPath);
}).tag('@rtf').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', () => {
  const inPath = './src/data/multiset';
  icapclient.processFiles(inPath, outputPath);
}).tag('@multiset');

Scenario('Supported archive files process is successful', () => {
  const inPath = './src/data/archive_success';
  icapclient.processFiles(inPath, outputPath);
}).tag('@archives').tag('@fileprocess').tag('@functional');



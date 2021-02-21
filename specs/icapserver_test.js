const { I,icapclient } = inject();
const outputPath = './output/downloads'

Feature('Icap Client File Processing');


Scenario('I process a non supported file using icap client tool', async () => {
  const file = 'icaptest.ps1'
  I.cleanupFile(`${outputPath}/${file}`);
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
  const inPath = './src/data/office';
  await icapclient.processFiles(inPath, outputPath);
}).tag('@office').tag('@fileprocess').tag('@functional');

Scenario('Supported image files process is successful', async () => {
  const inPath = './src/data/images';
  await icapclient.processFiles(inPath, outputPath);
}).tag('@images').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', async () => {
  const inPath = './src/data/pdf';
  await icapclient.processFiles(inPath, outputPath);
}).tag('@pdf').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', async () => {
  const inPath = './src/data/rtf';
  await icapclient.processFiles(inPath, outputPath);
}).tag('@rtf').tag('@fileprocess').tag('@functional');

Scenario('Supported pdf files process is successful', async () => {
  const inPath = './src/data/multiset';
  await icapclient.processFiles(inPath, outputPath);
}).tag('@multiset');

Scenario('Supported archive files process is successful', async () => {
  const inPath = './src/data/archive_success';
  await icapclient.processFiles(inPath, outputPath);
}).tag('@archives').tag('@fileprocess').tag('@functional');



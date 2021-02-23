const path = require('path');
const { I, requesthistoryPage,icapclient } = inject();
let fileId;
let resp;
let fileContent;

Given('The file {string} is not in download folder', async (file) => {
    const downloadedFile = path.join('output', 'downloads', file);
    console.log(`downloadedFile: ${downloadedFile}`)
    I.cleanupFile(downloadedFile);

});

Given('I am logged into the portal', () => {
    I.login()
});

Given('I am on the draft Adaptation policy screen', async() => {
    I.goToContentManagementPolicy();
    await I.goToDraftAdaptationPolicy()
});

Given('The NCFS routing is set to Block for supported files', async () => {
    await I.setGwBlockFilesToBlock();
});


Given('I set a policy for file type {string} with {string} set to {string}', async (fileType, contentFlag, flagType) => {
    await I.setRequiredContentFlag(fileType, contentFlag, flagType);
})

When('I process file {string} through the icap server using Icap client', (file) => {
    fileContent = I.getFileOutContent(file);
    resp = icapclient.submitFile(file);
})

Then('The file {string} appears in the output folder as {string} with required content', async (file, fileOutcome) => {
    const outputPath = './output/downloads'
    const icapCode = I.getIcapHeaderCode(resp)
    const respCode = I.getResponseCode(resp)
    if (fileOutcome === 'sanitised') {
        if (icapCode === '200 OK' && respCode === '200 OK') {
            console.log('Success, Response code is 200 as expected')
            I.confirmFileOutputiSAvailable(`${outputPath}/${file}`)
            I.checkFileOutputContent(fileContent)
        } else {
            assert.fail(`Failed, the header code is ${icapCode} and the response code is ${respCode}`)
        }
    } else if (fileOutcome === 'htmlReport') {
        if (icapCode === '200 OK' && respCode === '403 Forbidden') {
            console.log('Success, Response code is 403 as expected')
            I.checkFileOutputIsHtmlReport(`${outputPath}/${file}`)
        } else {
            assert.fail(`Failed, the header code is ${icapCode} and the response code is ${respCode}`)
        } 
    }
    })

Then('The transaction log shows the file with type {string} as {string}', async (fileExtension, outcomeValue) => {
    fileId = await I.getFileId(resp)
    I.viewTransactions('12 Hours');
    await requesthistoryPage.checkFileTypeValueByFileId(fileExtension, fileId, true)
    await requesthistoryPage.checkFileOutcomeValueByFileId(outcomeValue, fileId, true)
    })

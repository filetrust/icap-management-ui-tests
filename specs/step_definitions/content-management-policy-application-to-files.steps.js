const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const { I, icapProxyPage, policyPage, requesthistoryPage } = inject();
let isLocal;
let fileId;
isLocal = true; // TODO: uncomment to run locally using  ICAP client in Docker

Given('I remove the {string} file downloaded before if it exists', async (file) => {
    const downloadedFile = path.join('output', 'downloads', file);
    console.log(`downloadedFile: ${downloadedFile}`)
    I.cleanupFile(downloadedFile);
});

Given('I am logged into the portal', () => {
    I.login('', '')
});

Given('I am on the draft Adaptation policy screen', () => {
    I.goToContentManagementPolicy();
    I.goToDraftAdaptationPolicy()
});

Given('I set a policy for file type {string} with {string} set to {string}', async (fileType, contentFlag, flagType) => {
    await policyPage.setAndPublishPolicyFlag(fileType, contentFlag, flagType);
})

When('I process file {string} file {string} through the icap server', async (fileType, file) => {
    if (isLocal) {
        fileId = await I.sendFileICAP(file)
        await I.say(`I sent a file and received ${fileId}`);
    } else {
        I.onIcapProxyPage()
        icapProxyPage.downloadFile(fileType)
    }
})

Then('The {string} with file type {string} processing outcome is as expected {string} and {string}', async (file, fileExtension, fileOutcome, outcomeValue) => {
    if (isLocal) {
        // verify file and content
        const outputDir = path.join('output', 'downloads');
        I.amInPath(outputDir)
        I.seeFile(file)
        // const outputPath = path.join('output', 'downloads', file);
        // const inputPath = path.join('src', 'data', 'input', file);
        // const outputFile = fs.readFileSync(outputPath, 'base64');
        // const inputFile = fs.readFileSync(inputPath, 'base64');
        // console.log(`length i: ${inputFile.length}, o: ${outputFile.length}`)
        //TODO: how to improve - could we add the expected file? is it better to check results in UI detail view? 
        //assert.notStrictEqual(inputFile.length, outputFile.length, 'Output and input files length is the same')
        //assert.notStrictEqual(inputFile, outputFile, 'Output and input files content is the same')
        I.goToRequestHistory();
        requesthistoryPage.openDatePicker();
        requesthistoryPage.selectTimePeriod('1 Hour')
        // verify file in request history
        await requesthistoryPage.checkFileTypeValueByFileId(fileExtension, fileId, true)
        await requesthistoryPage.checkFileOutcomeValueByFileId(outcomeValue, fileId, true)
    } else {
        if (fileOutcome === 'Sanitised') {
            const filePath = `output/downloads/${file.trim()}`
            I.checkFileInFileDropUrl(filePath)
            I.see('File is clean')
            I.say('The file is successfully processed and clean')
        } else if (fileOutcome === 'htmlReport') {
            await icapProxyPage.checkIfHtmlReportReturned()
        }
    }
})

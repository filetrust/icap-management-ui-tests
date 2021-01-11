const assert = require('assert').strict;
const fs = require('fs')
const { I, icapProxyPage, policyPage, requesthistoryPage } = inject();
let isLocal;
let fileId;
//isLocal = true; // TODO: uncomment to run locally using  ICAP client in Docker
const icapDir = '../p-ui-wireframes/'
const testsDir = '../icap-management-ui-tests/'
const inputDir = 'src/data/input/'
const outputDir = 'output/downloads/'

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

When('I process file {string} file {string} through the icap server', (fileType, file) => {
    if (isLocal) {
        fileId = I.sendFileICAP(file, icapDir, testsDir, inputDir, outputDir)
    } else {
        I.onIcapProxyPage()
        icapProxyPage.downloadFile(fileType)
    }
})

Then('The {string} with file type {string} processing outcome is as expected {string} and {string}', async (file, fileExtension, fileOutcome, outcomeValue) => {
    if (isLocal) {
        // verify file and content
        I.amInPath(outputDir)
        I.seeFile(file)
        const outputFile = fs.readFileSync(`${outputDir}${file.trim()}`, 'base64');
        const inputFile = fs.readFileSync(`${inputDir}${file.trim()}`, 'base64');
        assert.notStrictEqual(inputFile.length, outputFile.length, 'Output and input files length is the same')
        assert.notStrictEqual(inputFile, outputFile, 'Output and input files content is the same') //TODO: how to improve?

        // TODO: improve using 'fileId'
        // I.wait(90)
        I.goToRequestHistory();
        requesthistoryPage.openDatePicker();
        requesthistoryPage.selectTimePeriod('1 Hour')
        requesthistoryPage.openDatePicker()
        await requesthistoryPage.selectCustomPriod()
        await requesthistoryPage.setTimeFromEarleirOn(2)

        // verify file in request history
        const rowsQuantity = await I.getRowsQuantity()
        if (rowsQuantity !== 1) {
            assert.fail(`Row quantity is ${rowsQuantity}`)
        };
        await requesthistoryPage.checkFileTypeValues(fileExtension, true)
        await requesthistoryPage.checkFileOutcomeValues(outcomeValue, true)
        // remove downloaded file
        requesthistoryPage.cleanupFile(`${outputDir}${file.trim()}`);
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

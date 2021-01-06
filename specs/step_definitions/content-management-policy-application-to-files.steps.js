const assert = require('assert').strict;
const { I, icapProxyPage, policyPage, requesthistoryPage } = inject();
let isLocal;
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
        I.sendFileICAP(file, icapDir, testsDir, inputDir, outputDir)
    } else {
        I.onIcapProxyPage()
        icapProxyPage.downloadFile(fileType)
    }
})

Then('The {string} with file type {string} processing outcome is as expected {string} and {string}', async (file, fileExtension, fileOutcome, outcomeValue) => {
    if (isLocal) {
        // verify file content
        I.amInPath(outputDir)
        I.seeFile(file)
        I.seeInThisFile('', 'utf8') // TODO: set file content after fixing ICAP client
        // request history for last two minutes // TODO: improve this part after adding sorting for timestamp
        I.wait(90) // TODO: the file is not immediately displayed in the table
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
        await requesthistoryPage.checkFileTypeValues(fileExtension)
        await requesthistoryPage.checkFileOutcomeValues(outcomeValue)
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
